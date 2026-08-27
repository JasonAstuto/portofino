import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center pt-16 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-20">
          <div className="space-y-8">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-2 text-sm text-slate-500"
            >
              <MapPin size={14} />
              <span>Nevada, USA · Available for remote engagements</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-tight"
              >
                Jason Astuto
              </motion.h1>
              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-xl text-slate-500 font-light leading-relaxed"
              >
                Cloud Architecture · AI/LLM Platform · Platform Engineering
              </motion.p>
            </div>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              I help healthcare and technology companies build the cloud foundations,
              AI platforms, and engineering systems that scale — from architecture through production.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Work together <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                See what I do
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                <div className="text-center space-y-3 p-8">
                  <div className="w-24 h-24 rounded-full bg-slate-300 mx-auto" />
                  <div className="h-4 bg-slate-200 rounded w-32 mx-auto" />
                  <div className="h-3 bg-slate-200 rounded w-24 mx-auto" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-xs text-slate-500 font-medium">Currently working with</p>
                <p className="text-sm text-slate-900 font-semibold mt-0.5">Sliced Health</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="border-t border-slate-100 py-8 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {[
            { value: "20+", label: "Years in software" },
            { value: "5+", label: "Years in cloud architecture" },
            { value: "HIPAA/SOC 2", label: "Regulated environments" },
            { value: "AWS · Azure", label: "Cloud platforms" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
