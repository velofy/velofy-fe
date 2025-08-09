import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const Nav = () => (
  <header className="sticky top-0 z-30 border-b border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container-app flex h-16 items-center justify-between">
      <a href="#home" className="font-display text-lg tracking-wide hover:opacity-90">Velofy</a>
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <a href="#products" className="text-muted-foreground hover:text-foreground story-link">Products</a>
        <a href="#approach" className="text-muted-foreground hover:text-foreground story-link">Approach</a>
        <a href="https://kaiross.velofyhq.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground story-link">Kaiross</a>
        <a href="https://taxpe.velofyhq.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground story-link">TaxPe</a>
      </nav>
      <div className="flex items-center gap-2">
        <a href="#products" className="text-sm text-muted-foreground hover:text-foreground">Explore</a>
      </div>
    </div>
  </header>
);

function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.07}px, ${dy * 0.07}px)`;
  };
  const onLeave = () => { const el = ref.current; if (el) el.style.transform = "translate(0,0)"; };
  return (
    <a ref={ref} href={href} target="_blank" rel="noreferrer"
      onMouseMove={onMove} onMouseLeave={onLeave}
      className="inline-flex">
      <Button variant="hero" size="xl" className="hover-scale">
        {children}
      </Button>
    </a>
  );
}

const Hero = () => {
  const [pos, setPos] = useState({ x: 50, y: 20 });
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x, y });
  };

  return (
    <section id="home" onMouseMove={onMouseMove}
      style={{ ['--x' as any]: `${pos.x}%`, ['--y' as any]: `${pos.y}%` }}
      className="relative overflow-hidden hero-aurora">
      <div className="container-app relative z-10 py-28 md:py-36">
        <p className="mb-4 text-sm text-muted-foreground animate-fade-in">AI-native studio</p>
        <h1 className="font-display text-4xl leading-tight md:text-6xl font-semibold tracking-tight animate-fade-in">
          We create things people want.
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground animate-fade-in">
          At Velofy we craft high-agency products powered by LLMs and Generative AI.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 animate-scale-in">
          <MagneticButton href="https://kaiross.velofyhq.com">Explore Kaiross</MagneticButton>
          <MagneticButton href="https://taxpe.velofyhq.com">Try TaxPe</MagneticButton>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0" />
    </section>
  );
};

function ProductCard({ title, description, href, tag }: { title: string; description: string; href: string; tag: string }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${py * -6}deg`);
    el.style.setProperty("--ry", `${px * 10}deg`);
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };
  return (
    <a ref={ref} href={href} target="_blank" rel="noreferrer" onMouseMove={onMove} onMouseLeave={onLeave}
       className="group block will-change-transform [transform:perspective(900px)_rotateX(var(--rx,0))_rotateY(var(--ry,0))] transition-transform duration-200">
      <div className="card-glass rounded-2xl p-6 md:p-8 shadow-[var(--shadow-elevated)]">
        <div className="mb-4 inline-flex items-center rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground">
          {tag}
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-foreground">
          {title}
        </h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <div className="mt-6">
          <Button variant="glass">Open</Button>
        </div>
      </div>
    </a>
  );
}

const Products = () => (
  <section id="products" className="relative py-20 md:py-28">
    <div className="container-app">
      <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight mb-4">Products</h2>
      <p className="text-muted-foreground max-w-2xl mb-10">Two focused experiences built for speed and clarity.</p>
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        <ProductCard
          title="Kaiross - discover people in natural language"
          description="A social platform where search feels like a conversation. Find people, not keywords."
          href="https://kaiross.velofyhq.com"
          tag="AI Social Discovery"
        />
        <ProductCard
          title="TaxPe - file taxes in less than 3 minutes"
          description="Upload, confirm, and file. Automated checks, human-level answers when you need them."
          href="https://taxpe.velofyhq.com"
          tag="AI Tax Filing"
        />
      </div>
    </div>
  </section>
);

const Approach = () => (
  <section id="approach" className="py-20 md:py-24">
    <div className="container-app grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight mb-4">High-agency, AI-native</h2>
        <p className="text-muted-foreground leading-relaxed">
          We move fast, ship ambitiously, and obsess over experience. LLMs and Generative AI aren’t features-they’re the canvas we build on.
        </p>
      </div>
      <div className="card-glass rounded-2xl p-6 md:p-8">
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li>• Natural language interfaces where it matters</li>
          <li>• Latency budgets and perceived-performance first</li>
          <li>• Delightful motion, accessible by default</li>
          <li>• Composable systems and sharp craft</li>
        </ul>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border/60">
    <div className="container-app py-10 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
      <p>© {new Date().getFullYear()} Velofy. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="https://kaiross.velofyhq.com" target="_blank" rel="noreferrer" className="story-link">Kaiross</a>
        <a href="https://taxpe.velofyhq.com" target="_blank" rel="noreferrer" className="story-link">TaxPe</a>
      </div>
    </div>
  </footer>
);

const Index = () => {
  // Structured data
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Velofy",
    url: "https://velofyhq.com/",
    slogan: "We create things people want.",
    sameAs: ["https://kaiross.velofyhq.com", "https://taxpe.velofyhq.com"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Velofy Products",
      itemListElement: [
        { "@type": "Product", name: "Kaiross", url: "https://kaiross.velofyhq.com", description: "Discover people with natural language." },
        { "@type": "Product", name: "TaxPe", url: "https://taxpe.velofyhq.com", description: "File taxes in 60 seconds." }
      ]
    }
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <Nav />
      <main>
        <Hero />
        <Products />
        <Approach />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
};

export default Index;
