import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase">Contact</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
                Let's work together.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you need architecture clarity, a platform build, or a trusted technical partner
                for a focused engagement — reach out and let's talk about what you're trying to solve.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => window.open("mailto:jason.astuto@gmail.com", "_blank")}
              >
                <Mail size={16} className="mr-2" />
                Send an email
                <ArrowRight size={14} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open("https://linkedin.com/in/jasonastuto", "_blank")}
              >
                <Linkedin size={16} className="mr-2" />
                Connect on LinkedIn
              </Button>
            </div>

            <p className="text-sm text-slate-400">
              Available for remote engagements · Based in Nevada, USA
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
