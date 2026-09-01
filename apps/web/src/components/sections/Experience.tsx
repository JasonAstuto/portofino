import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    company: "Sliced Health",
    role: "Platform & Cloud Architecture Lead",
    period: "2024 – 2026",
    description:
      "Drove cloud and AI platform modernization in a HIPAA-regulated environment, creating a delivery model that reduced friction across architecture, engineering, and operational processes.",
    tags: ["AWS", "CDK", "AI/LLM", "HIPAA", "Platform strategy"],
  },
  {
    company: "Annexus Health",
    role: "Software Architect",
    period: "2022 – 2024",
    description:
      "Led enterprise modernization work for healthcare systems, including PHI-aware architecture, security segmentation, and platform standardization that improved team velocity and governance.",
    tags: ["Healthcare SaaS", "AWS", "Governance", "Platform standards"],
  },
  {
    company: "Amplify Consulting Partners",
    role: "Engineering & Technology Consulting Lead",
    period: "2021 – 2022",
    description:
      "Advised clients on architecture and transformation programs across healthcare and enterprise technology, helping leadership teams balance delivery speed with risk and platform quality.",
    tags: ["Consulting", "Transformation", "Cloud Architecture", "Advisory"],
  },
  {
    company: "Microsoft",
    role: "Software Engineering / Cloud / Research",
    period: "2016 – 2021",
    description:
      "Worked on large-scale cloud infrastructure and platform engineering initiatives, with strong emphasis on distributed systems, security posture, and production reliability.",
    tags: ["Azure", "Distributed systems", "Security", "Platform engineering"],
  },
  {
    company: "FTSE Russell / London Stock Exchange Group",
    role: "Software Engineering / Technology",
    period: "2012 – 2016",
    description:
      "Built and supported mission-critical enterprise systems for global financial-services environments, including market data and regulated technology delivery workflows.",
    tags: ["Financial services", "Data platforms", "Enterprise systems"],
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
