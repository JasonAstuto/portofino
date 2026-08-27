export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Jason Astuto. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/jasonastuto"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:jason.astuto@gmail.com"
            className="hover:text-slate-900 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
