import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const techCategories = [
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "Azure", "CDK", "Terraform", "CloudFormation", "VPC", "EKS", "Lambda", "S3", "RDS"],
  },
  {
    category: "AI / ML Platform",
    items: ["LLM integration", "Prompt engineering", "Agent frameworks", "Model evaluation", "Feature pipelines", "Inference serving", "RAG"],
  },
  {
    category: "Backend & APIs",
    items: ["C# / .NET", "Python", "FastAPI", "REST / OpenAPI", "GraphQL", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    category: "DevOps & Observability",
    items: ["GitHub Actions", "Docker", "Kubernetes", "Datadog", "OpenTelemetry", "PagerDuty", "Grafana"],
  },
  {
    category: "Data & Analytics",
    items: ["Snowflake", "dbt", "Redshift", "Athena", "Glue", "Pandas", "Spark"],
  },
  {
    category: "Security & Compliance",
    items: ["HIPAA", "SOC 2", "IAM", "KMS", "WAF", "VPN / PrivateLink", "Secrets Manager"],
  },
];

export function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tech" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-2 mb-14"
        >
          <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase">Technology</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
            Tools I work with.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4"
            >
              <h3 className="text-sm font-semibold text-slate-900">{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
