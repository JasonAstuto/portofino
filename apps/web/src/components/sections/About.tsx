import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase">About</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
                Engineering leader who ships.
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                I'm a software architect and platform engineering leader with 20+ years of experience
                building systems that handle the real complexity of regulated industries — healthcare,
                financial services, and enterprise cloud at scale.
              </p>
              <p>
                From hyperscaler work at Microsoft and market-data systems at FTSE Russell / London Stock
                Exchange Group, to leading cloud and AI platform architecture at healthcare SaaS companies —
                I've been the person who makes sense of hard technical problems and turns them into
                production-grade platforms teams can rely on.
              </p>
              <p>
                I work with companies on a project basis: a focused architecture engagement, a platform build,
                a technical advisory relationship, or embedding with your team for a sprint or two.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {["Healthcare SaaS", "HIPAA / SOC 2", "AWS", "AI/LLM", "Platform Engineering", "Team Leadership"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-slate-100" />
                <p className="font-medium text-slate-900">Technical depth + executive communication</p>
                <p className="text-sm text-slate-500">
                  I can go deep in the code and translate it into board-level strategy.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100" />
                <p className="text-sm font-medium text-slate-900">Regulated environments</p>
                <p className="text-xs text-slate-500">HIPAA, SOC 2, financial compliance</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100" />
                <p className="text-sm font-medium text-slate-900">End-to-end delivery</p>
                <p className="text-xs text-slate-500">Architecture through production ops</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
