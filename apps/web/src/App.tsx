import { useEffect, useState } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { TechStack } from "@/components/sections/TechStack";
import { Highlights } from "@/components/sections/Highlights";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { ResumePage } from "@/components/pages/ResumePage";

export default function App() {
  const [view, setView] = useState<"portfolio" | "resume">(() =>
    typeof window !== "undefined" && window.location.hash === "#resume" ? "resume" : "portfolio",
  );

  useEffect(() => {
    const syncView = () => {
      setView(window.location.hash === "#resume" ? "resume" : "portfolio");
    };

    syncView();
    window.addEventListener("hashchange", syncView);
    return () => window.removeEventListener("hashchange", syncView);
  }, []);

  if (view === "resume") {
    return <ResumePage />;
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <TechStack />
        <Highlights />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
