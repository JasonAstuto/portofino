import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import * as path from "path";

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = this.node.tryGetContext("domainName") as string | undefined;
    const hostedZoneName = this.node.tryGetContext("hostedZoneName") as string | undefined;
    const hostedZoneId = this.node.tryGetContext("hostedZoneId") as string | undefined;
    const contactToEmail = (this.node.tryGetContext("contactToEmail") as string | undefined) ?? "willow-june@proton.me";
    const contactFromEmail = (this.node.tryGetContext("contactFromEmail") as string | undefined) ?? contactToEmail;
    const customDomainEnabled = !!domainName || !!hostedZoneName || !!hostedZoneId;
    const wwwDomainName = domainName ? `www.${domainName}` : undefined;

    const hostedZone = hostedZoneId
      ? route53.HostedZone.fromHostedZoneAttributes(this, "HostedZone", {
          hostedZoneId,
          zoneName: hostedZoneName ?? domainName ?? "",
        })
      : customDomainEnabled && hostedZoneName && this.account && this.region
        ? route53.HostedZone.fromLookup(this, "HostedZone", {
            domainName: hostedZoneName,
          })
        : undefined;

    const certificate = customDomainEnabled && domainName && hostedZone
      ? new acm.Certificate(this, "SiteCertificate", {
          domainName,
          subjectAlternativeNames: wwwDomainName ? [wwwDomainName] : undefined,
          validation: acm.CertificateValidation.fromDns(hostedZone),
        })
      : undefined;

    // S3 bucket — private, CloudFront accesses via OAC
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      bucketName: `jason-astuto-portfolio-${this.account}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // CloudFront Function: rewrite all non-asset requests to index.html (SPA routing)
    const spaRoutingFunction = new cloudfront.Function(this, "SpaRoutingFunction", {
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (!uri.includes('.')) {
    request.uri = '/index.html';
  }
  return request;
}
      `),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      comment: "Rewrite SPA routes to index.html",
    });

    // OAC for S3 (replaces legacy OAI)
    const oac = new cloudfront.S3OriginAccessControl(this, "OAC", {
      description: "OAC for portfolio site S3 bucket",
    });

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, "Distribution", {
      certificate: certificate ?? undefined,
      domainNames: customDomainEnabled && domainName && wwwDomainName ? [domainName, wwwDomainName] : undefined,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket, {
          originAccessControl: oac,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
        functionAssociations: [
          {
            function: spaRoutingFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: cdk.Duration.seconds(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: cdk.Duration.seconds(0),
        },
      ],
      defaultRootObject: "index.html",
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      comment: "Jason Astuto Portfolio",
    });

    if (customDomainEnabled && domainName && hostedZone) {
      new route53.ARecord(this, "ApexAliasRecord", {
        zone: hostedZone,
        recordName: undefined,
        target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      });

      new route53.AaaaRecord(this, "ApexAliasAaaaRecord", {
        zone: hostedZone,
        recordName: undefined,
        target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      });

      if (wwwDomainName) {
        new route53.ARecord(this, "WwwAliasRecord", {
          zone: hostedZone,
          recordName: "www",
          target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
        });

        new route53.AaaaRecord(this, "WwwAliasAaaaRecord", {
          zone: hostedZone,
          recordName: "www",
          target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
        });
      }
    }

    const contactDestination = contactToEmail;
    const contactSender = contactFromEmail;

    const contactHandler = new lambda.Function(this, "ContactHandler", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: process.env.AWS_REGION || "us-east-1" });

const destinationAddress = process.env.EMAIL_TO || "willow-june@proton.me";
const senderAddress = process.env.EMAIL_FROM || process.env.EMAIL_TO || "willow-june@proton.me";

function sanitizeField(value, maxLength) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return buildResponse(200, { ok: true });
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return buildResponse(400, { error: "Invalid JSON payload." });
  }

  const name = sanitizeField(payload.name, 80);
  const email = sanitizeField(payload.email, 254).toLowerCase();
  const company = sanitizeField(payload.company, 120);
  const project = sanitizeField(payload.project, 200);
  const message = sanitizeField(payload.message, 2500);
  const suspiciousPattern = /(?:<\s*script|javascript:|onerror=|\b(?:from|to|cc|bcc):)/i;

  if (!name || !email || !message) {
    return buildResponse(422, { error: "Name, email, and message are required." });
  }

  if (!isValidEmail(email)) {
    return buildResponse(422, { error: "Please provide a valid email address." });
  }

  if ([name, email, company, project, message].some((value) => suspiciousPattern.test(value))) {
    return buildResponse(400, { error: "Input contains invalid or unsafe content." });
  }

  const subject = company ? "Portfolio inquiry from " + name + " (" + company + ")" : "Portfolio inquiry from " + name;
  const projectLine = project ? "\nProject type: " + project : "";
  const companyLine = company ? "\nCompany: " + company : "";

  const emailParams = {
    Source: senderAddress,
    Destination: {
      ToAddresses: [destinationAddress],
    },
    ReplyToAddresses: [email],
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Text: {
          Data: [
            "New portfolio inquiry",
            "Name: " + name,
            "Email: " + email,
            companyLine,
            projectLine,
            "",
            "Message:",
            message,
          ].join("\n"),
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    await ses.sendEmail(emailParams).promise();
    return buildResponse(200, { success: true });
  } catch (error) {
    console.error("SES send failed", error);
    return buildResponse(500, { error: "Unable to send your message right now." });
  }
};
      `),
      environment: {
        EMAIL_TO: contactDestination,
        EMAIL_FROM: contactSender,
      },
      timeout: cdk.Duration.seconds(30),
    });

    contactHandler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: ["*"],
      }),
    );

    const contactApi = new apigateway.RestApi(this, "ContactApi", {
      restApiName: "PortfolioContactApi",
      description: "API for sending portfolio inquiries",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ["Content-Type", "Authorization"],
      },
    });

    const contactResource = contactApi.root.addResource("contact");
    contactResource.addMethod("POST", new apigateway.LambdaIntegration(contactHandler));
    contactResource.addMethod("OPTIONS", new apigateway.MockIntegration({
      integrationResponses: [{ statusCode: "200", responseParameters: { "method.response.header.Access-Control-Allow-Origin": "'*'" } }],
      passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
      requestTemplates: { "application/json": '{"statusCode": 200}' },
    }), {
      methodResponses: [{ statusCode: "200", responseParameters: { "method.response.header.Access-Control-Allow-Origin": true } }],
    });

    // Deploy built assets
    new s3deploy.BucketDeployment(this, "DeployAssets", {
      sources: [s3deploy.Source.asset(path.join(__dirname, "../../apps/web/dist"))],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    // Outputs
    new cdk.CfnOutput(this, "DistributionDomain", {
      value: `https://${distribution.distributionDomainName}`,
      description: "CloudFront distribution URL",
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
      description: "CloudFront distribution ID",
    });

    new cdk.CfnOutput(this, "BucketName", {
      value: siteBucket.bucketName,
      description: "S3 bucket name",
    });

    new cdk.CfnOutput(this, "ContactApiEndpoint", {
      value: `${contactApi.url}contact`,
      description: "Portfolio contact API endpoint",
    });
  }
}
