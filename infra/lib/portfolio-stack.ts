import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
import * as path from "path";

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domainName = this.node.tryGetContext("domainName") as string | undefined;
    const hostedZoneName = this.node.tryGetContext("hostedZoneName") as string | undefined;
    const hostedZoneId = this.node.tryGetContext("hostedZoneId") as string | undefined;
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
  }
}
