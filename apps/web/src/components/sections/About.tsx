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
                Strategy and execution for modern delivery.
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                I am a consulting architect and delivery partner for companies navigating digital
                transformation, AI adoption, and the operational realities of modern software delivery.
                My work helps leadership teams cut through complexity and turn technical change into
                measurable business outcomes.
              </p>
              <p>
                Over the last 20+ years, I’ve worked across healthcare, financial services, enterprise SaaS,
                and global technology programs — from cloud architecture and platform transformation to team
                design, developer workflow optimization, and AI-enabled operating models.
              </p>
              <p>
                I help organisations decide what to build, how to structure the work, and how to align
                engineering, leadership, and platform decisions so transformation is sustainable instead of
                expensive drift.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {["Digital transformation", "AI adoption", "Dev workflow optimization", "Cloud strategy", "Platform design", "Executive advisory"].map(
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
