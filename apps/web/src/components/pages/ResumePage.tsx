import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, MapPin } from "lucide-react";

const experience = [
  {
    company: "Sliced Health",
    role: "Platform & Cloud Architecture Lead",
    period: "2024 – 2026",
    summary:
      "Led cloud and AI platform modernization for a HIPAA-regulated healthcare SaaS product; focused on secure architecture, developer productivity, and AI-enabled operational efficiency.",
  },
  {
    company: "Annexus Health",
    role: "Software Architect",
    period: "2022 – 2024",
    summary:
      "Modernized multi-tenant healthcare systems, improved security posture, and built platform standards for enterprise delivery teams.",
  },
  {
    company: "Amplify Consulting Partners",
    role: "Engineering & Technology Consulting Lead",
    period: "2021 – 2022",
    summary:
      "Advised executives and product teams on architecture strategy, cloud roadmaps, and large-scale technology modernization engagements.",
  },
  {
    company: "Microsoft",
    role: "Software Engineering / Cloud / Research",
    period: "2016 – 2021",
    summary:
      "Worked across cloud engineering, security architecture, and distributed systems at hyperscale, with emphasis on platform reliability and engineering excellence.",
  },
];

const capabilities = [
  "Digital transformation strategy",
  "AI adoption and governance",
  "Developer workflow optimization",
  "Cloud architecture and modernization",
  "Platform engineering and DevEx",
  "Enterprise architecture leadership",
  "Healthcare and regulated systems",
  "Technical advisory and delivery leadership",
];

const highlights = [
  "20+ years building software and delivering technology platforms",
  "10+ years in cloud architecture and systems design",
  "Experience across healthcare, fintech, enterprise SaaS, and global markets",
  "Strong executive communication paired with hands-on technical execution",
];

export function ResumePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </a>

          <a
            href="mailto:willow-june@proton.me?subject=Resume%20request"
            className="inline-flex items-center gap-2 text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Mail size={16} />
            Request full CV
          </a>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase">Resume</p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Jason Astuto</h1>
              <p className="text-xl text-slate-600">Consulting Architect · Platform Strategy · AI Adoption</p>
            </div>

            <div className="flex flex-col gap-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} />
                Nevada, USA · Remote available
              </span>
              <span>willow-june@proton.me</span>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-8">
            <p className="text-base leading-relaxed text-slate-600 max-w-3xl">
              I help leadership teams modernize critical platforms, accelerate AI adoption, and improve the engineering workflows that drive delivery. My work sits at the intersection of architecture, execution, and business impact — bringing clarity to complex transformation programs and turning technical strategy into measurable operating leverage.
            </p>
          </div>
        </motion.section>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-5">Experience</h2>
              <div className="space-y-5">
                {experience.map((job) => (
                  <motion.article
                    key={job.company}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{job.company}</h3>
                        <p className="text-sm text-slate-600">{job.role}</p>
                      </div>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {job.period}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">{job.summary}</p>
                  </motion.article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-5">Selected capabilities</h2>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-medium border border-slate-200 bg-white text-slate-600 px-3 py-1.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Core strengths</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-50">
              <h3 className="text-lg font-semibold mb-4">Engagement model</h3>
              <ul className="space-y-3 text-sm text-slate-200">
                <li>Architecture advisory for leadership teams</li>
                <li>AI and digital transformation strategy</li>
                <li>Focused execution sprints and platform delivery</li>
                <li>Operational improvement for engineering organizations</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact</h3>
              <a
                href="mailto:willow-june@proton.me"
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 hover:text-indigo-900"
              >
                <Download size={14} />
                willow-june@proton.me
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
