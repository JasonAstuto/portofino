import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const highlights = [
  {
    area: "AI Adoption",
    title: "AI adoption that actually changes operating leverage",
    description:
      "I help companies focus on the AI opportunities that deliver real efficiency gains — reducing repetitive work, accelerating delivery, and improving decision quality without creating governance chaos.",
    outcome: "Measurable productivity gains without uncontrolled AI sprawl",
  },
  {
    area: "Digital Transformation",
    title: "Complex modernization programs with clearer decision paths",
    description:
      "I structure transformation work so leadership teams can see tradeoffs, dependencies, and risk early — creating a more disciplined path from legacy complexity to business-ready platforms.",
    outcome: "Better execution confidence for difficult modernization efforts",
  },
  {
    area: "Developer Workflow Optimization",
    title: "Delivery workflows that remove drag instead of adding process",
    description:
      "I improve CI/CD, platform automation, team boundaries, and operating rhythms so engineering organizations can deliver with fewer meeting-heavy bottlenecks and less rework.",
    outcome: "Higher engineering throughput with lower operational friction",
  },
  {
    area: "Platform Design",
    title: "Architecture decisions made for scale and accountability",
    description:
      "I design the technical foundations needed for secure, maintainable, and high-velocity product delivery — from cloud architecture to operating model design and governance.",
    outcome: "A platform that teams can trust and scale",
  },
  {
    area: "Leadership Advisory",
    title: "Executive clarity during product and platform change",
    description:
      "I help leadership teams assess whether they need advisory support, architecture depth, or embedded delivery leadership — ensuring the right level of support at the right moment.",
    outcome: "Sharper strategy and faster execution under pressure",
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
