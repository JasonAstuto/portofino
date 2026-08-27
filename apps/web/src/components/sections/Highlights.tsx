import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const highlights = [
  {
    area: "AI Platform",
    title: "Built AI/LLM infrastructure for a healthcare revenue-cycle product",
    description:
      "Designed and operated the full AI platform stack: model integration, prompt management, evaluation pipelines, and inference observability in a HIPAA-regulated AWS environment.",
    outcome: "Production AI workloads across a regulated SaaS product",
  },
  {
    area: "Cloud Architecture",
    title: "Modernized multi-tenant SaaS platform on AWS",
    description:
      "Rearchitected PHI isolation, security segmentation, and cloud-native deployment patterns for a health plan SaaS product serving multiple enterprise customers.",
    outcome: "Improved security posture + reduced deployment complexity",
  },
  {
    area: "Data Platform",
    title: "Authoritative analytics data models at GitLab",
    description:
      "Designed reusable Snowflake and dbt data models forming a single source of truth across engineering and go-to-market teams — replacing a fragmented reporting landscape.",
    outcome: "Cross-org analytics foundation adopted by GTM and Engineering",
  },
  {
    area: "Hyperscale Engineering",
    title: "Azure cloud and security platform at Microsoft",
    description:
      "Contributed to engineering initiatives across Azure cloud computing, security platforms, and Microsoft Research — operating in globally distributed, high-reliability infrastructure.",
    outcome: "Hyperscaler-scale distributed systems experience",
  },
  {
    area: "Financial Systems",
    title: "Mission-critical market-data systems at LSEG",
    description:
      "Designed enterprise software supporting global financial-services environments with strict availability, auditability, and regulatory requirements.",
    outcome: "High-availability systems serving global financial markets",
  },
];

export function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="highlights" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-2 mb-14"
        >
          <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase">Selected Work</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
            Problems I've solved.
          </h2>
        </motion.div>

        <div className="space-y-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                      {item.area}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  <p className="text-xs font-medium text-slate-500">
                    <span className="text-slate-400">Outcome: </span>
                    {item.outcome}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0 mt-1"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
