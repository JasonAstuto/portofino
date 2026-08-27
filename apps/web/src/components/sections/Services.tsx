import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cloud, Brain, Layers, Users } from "lucide-react";

const services = [
  {
    icon: Cloud,
    title: "Cloud Architecture",
    tagline: "AWS-native foundations built to last.",
    description:
      "Infrastructure design, security posture, IaC with CDK/Terraform, multi-tenant architecture, and cloud-native patterns for production-grade environments.",
    tags: ["AWS", "CDK", "Terraform", "Multi-tenant", "Security"],
  },
  {
    icon: Brain,
    title: "AI / LLM Platform",
    tagline: "AI that runs in regulated production.",
    description:
      "Model integration, evaluation infrastructure, prompt management, agent frameworks, inference observability, and feature pipelines for real-world AI products.",
    tags: ["LLM", "Agent frameworks", "Inference", "Evaluation", "MLOps"],
  },
  {
    icon: Layers,
    title: "Platform Engineering",
    tagline: "Developer platforms teams want to use.",
    description:
      "CI/CD pipeline engineering, developer tooling, SRE practices, observability stacks, incident response, and self-service platform capabilities.",
    tags: ["CI/CD", "GitHub Actions", "SRE", "Observability", "DevEx"],
  },
  {
    icon: Users,
    title: "Technical Leadership",
    tagline: "Strategy, standards, and execution.",
    description:
      "Architecture governance, engineering standards, team mentorship, technical due diligence, and stakeholder-facing technical strategy and roadmapping.",
    tags: ["Architecture review", "Due diligence", "Roadmapping", "Mentorship"],
  },
];

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-2 mb-14"
        >
          <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase">Services</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
            What I can do for your team.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group p-8 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 bg-white space-y-5"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <Icon size={22} className="text-slate-700" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="text-sm font-medium text-slate-500">{service.tagline}</p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
