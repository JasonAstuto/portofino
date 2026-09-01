import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    company: "Sliced Health",
    role: "Platform & Cloud Architecture Lead",
    period: "Oct 2024 – Sep 2026",
    description:
      "Own cloud and AI platform architecture for a HIPAA-regulated healthcare SaaS product. AWS infrastructure design with CDK, AI/LLM platform, SRE practices, and backend platform services in C# and Python.",
    tags: ["AWS", "CDK", "AI/LLM", "HIPAA", "C#", "Python"],
  },
  {
    company: "Annexus Health",
    role: "Software Architect",
    period: "Sep 2022 – Oct 2024",
    description:
      "Modernized a multi-tenant healthcare SaaS platform: PHI isolation, security segmentation, OpenAPI-first integration architecture, and enterprise-wide cloud-native standards.",
    tags: ["Multi-tenant SaaS", "AWS", "OpenAPI", "HIPAA", "CI/CD"],
  },
  {
    company: "Amplify Consulting Partners",
    role: "Engineering & Technology Consulting Lead",
    period: "Mar 2021 – Sep 2022",
    description:
      "Architecture and cloud consulting for enterprise clients across healthcare, tech, and financial services. Notable GitLab contract: authoritative data models in Snowflake and dbt.",
    tags: ["Consulting", "Snowflake", "dbt", "Cloud Architecture"],
  },
  {
    company: "Microsoft",
    role: "Software Engineering / Cloud / Research",
    period: "Dec 2016 – Feb 2021",
    description:
      "Azure cloud engineering across security architecture, distributed systems, and platform engineering at hyperscaler scale. Contributed to Azure cloud computing, security platforms, and Microsoft Research programs.",
    tags: ["Azure", "Distributed systems", "Security", "Cloud at scale"],
  },
  {
    company: "FTSE Russell / London Stock Exchange Group",
    role: "Software Engineering / Technology",
    period: "Jun 2012 – Dec 2016",
    description:
      "Enterprise software for global financial-services market-data environments. Large-scale data pipelines, integration APIs, and mission-critical systems with strict availability and regulatory requirements.",
    tags: ["Financial services", "Market data", "Data pipelines", "Enterprise"],
  },
];

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-2 mb-14"
        >
          <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase">Experience</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
            20+ years of building at scale.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 hidden md:block ml-2" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="md:pl-10 relative"
              >
                <div className="hidden md:block absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-slate-300 bg-white" />
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-900">{exp.company}</h3>
                      <p className="text-sm text-slate-600">{exp.role}</p>
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
