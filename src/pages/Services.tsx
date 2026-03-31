import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight, CheckCircle2, Phone, TreeDeciduous, Axe, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('ag-visible'); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`ag-fade-rise ${className}`}>{children}</div>;
}

function SilhouetteSlide({ side }: { side: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = '200ms';
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('ag-visible'); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={side === 'left' ? 'ag-slide-left' : 'ag-slide-right'}>
      <TreeDeciduous className="silhouette-icon w-16 h-16 md:w-24 md:h-24" />
    </div>
  );
}

const TREE_SERVICES = [
  { name: 'Tree Removal', path: '/services/tree-removal', desc: 'Safe removal of any tree, any size.' },
  { name: 'Emergency Services', path: '/services/emergency-services', desc: '24/7 storm response.' },
  { name: 'Tree Trimming & Pruning', path: '/services/tree-trimming', desc: 'Precision cuts for healthy growth.' },
  { name: 'Stump Grinding Services', path: '/services/stump-grinding', desc: 'Complete stump elimination.' },
  { name: 'Crane Tree Service', path: '/services/crane-tree-service', desc: 'Complex removals with crane equipment.' },
  { name: 'Lot Clearing', path: '/services/lot-clearing', desc: 'Full land prep and debris removal.' },
];

const LANDSCAPE_SERVICES = [
  { name: 'Sod Installation', path: '/services/sod-installation', desc: 'Instant, lush lawn transformations.' },
  { name: 'Paver Installation', path: '/services/paver-installation', desc: 'Custom patios and durable walkways.' },
  { name: 'Retaining Wall Installation', path: '/services/retaining-wall-installation', desc: 'Erosion control that looks great.' },
  { name: 'Fence Installation', path: '/services/fence-installation', desc: 'Privacy, security, and curb appeal.' },
  { name: 'Lawn Maintenance', path: '/services/lawn-maintenance', desc: 'Consistent care for a perfect yard.' },
];

export default function Services() {
  return (
    <div className="w-full font-sans text-black bg-white">

      {/* 1. SIGNATURE SILHOUETTE HEADER — white bg */}
      <section className="bg-white border-b-4 border-black overflow-hidden py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="silhouette-header">
            <SilhouetteSlide side="left" />
            <RevealSection className="flex flex-col items-center text-center flex-1 max-w-2xl">
              <span className="font-display font-bold uppercase tracking-widest text-[#FF8200] text-sm mb-2 block">
                What We Offer
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-black text-black uppercase tracking-wide leading-tight">
                OUR SERVICES
              </h1>
            </RevealSection>
            <SilhouetteSlide side="right" />
          </div>
        </div>
      </section>

      {/* 2. TREE SERVICES TAB BAND — ORANGE BG */}
      <section className="bg-[#FF8200] py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-black rounded p-2">
              <TreeDeciduous className="w-6 h-6 text-[#FF8200]" />
            </div>
            <span className="font-black text-black text-xl uppercase tracking-widest">Tree Services</span>
          </div>
          <a href="tel:919-358-2168" className="font-black text-black hover:underline text-lg flex items-center gap-2">
            <Phone className="w-5 h-5" /> (919) 358-2168
          </a>
        </div>
      </section>

      {/* 3. TREE SERVICES — BLACK background for maximum contrast */}
      <section id="tree-services" className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <RevealSection className="rounded-xl overflow-hidden shadow-2xl border-4 border-[#FF8200] h-[400px] lg:h-[600px] img-lift">
              <img src="/showcase (5).jpg" alt="Tree Services in Action" className="w-full h-full object-cover" />
            </RevealSection>

            <RevealSection delay={150}>
              <p className="text-[#FF8200] font-black text-sm uppercase tracking-widest mb-3">Professional Tree Care</p>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 leading-tight uppercase">
                EXPERT <span className="text-[#FF8200]">TREE</span> SERVICES
              </h2>
              <p className="text-white/80 mb-6 font-medium text-lg leading-relaxed">
                At Beavers Tree Service &amp; Landscaping Inc., we provide professional tree care designed to keep your property safe, healthy, and beautiful year round. With over 20 years of experience, our licensed and insured team handles everything from routine maintenance to complex removals.
              </p>
              <p className="text-white font-bold text-lg mb-10">
                Unlike big corporate providers, we are a local, family owned company that treats your property like our own. Every project starts with a free estimate, honest advice, and a commitment to safety, affordability, and customer satisfaction.
              </p>

              {/* Service cards — white on black, orange accent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {TREE_SERVICES.map(({ name, path, desc }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.03, background: '#FF8200' }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/10 border border-white/20 rounded-lg p-4 cursor-pointer group"
                    onClick={() => window.location.href = path}
                  >
                    <Link to={path} className="block">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#FF8200] group-hover:text-black shrink-0 mt-0.5 transition-colors" />
                        <div>
                          <p className="font-black text-white group-hover:text-black text-sm uppercase tracking-wide transition-colors">{name}</p>
                          <p className="text-white/60 group-hover:text-black/70 text-xs mt-1 transition-colors">{desc}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <Link to="/contact" className="bg-[#FF8200] text-black px-8 py-4 rounded font-black hover:bg-white transition-colors flex items-center gap-2 uppercase tracking-wide text-sm shadow-md">
                  Get Free Estimate <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a href="tel:919-358-2168" className="contact-link bg-white text-black px-8 py-4 rounded font-black hover:bg-[#FF8200] transition-colors flex items-center gap-3 shadow-md">
                  <Phone className="w-4 h-4 contact-icon text-[#FF8200]" />
                  <span>(919) 358-2168</span>
                </a>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 4. LANDSCAPING TAB BAND — BLACK BG */}
      <section className="bg-black border-t-4 border-b-4 border-[#FF8200] py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF8200] rounded p-2">
              <Leaf className="w-6 h-6 text-black" />
            </div>
            <span className="font-black text-white text-xl uppercase tracking-widest">Landscaping Services</span>
          </div>
          <Link to="/contact" className="font-black text-[#FF8200] hover:underline text-lg flex items-center gap-2">
            Free Estimate <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 5. LANDSCAPING SERVICES — WHITE BG (alternating contrast) */}
      <section id="landscaping-services" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <RevealSection delay={150}>
              <p className="text-[#FF8200] font-black text-sm uppercase tracking-widest mb-3">Transform Your Property</p>
              <h2 className="text-4xl md:text-5xl font-display font-black text-black mb-6 leading-tight uppercase">
                EXPERT <span className="text-[#FF8200]">LANDSCAPING</span> SERVICES
              </h2>
              <p className="text-black/80 mb-6 font-medium text-lg leading-relaxed">
                A beautiful, well maintained yard adds value to your home and brings your outdoor living space to life. At Beavers Tree Service &amp; Landscaping Inc., we go beyond tree care to provide comprehensive landscaping solutions that transform your property.
              </p>
              <p className="text-black/80 mb-10 font-medium text-lg leading-relaxed">
                Whether you are starting from scratch with a new sod installation, defining your garden with hardscaping like pavers and retaining walls, or simply need reliable lawn maintenance, our skilled team is ready to execute your vision with precision and lasting quality.
              </p>

              {/* Service cards — black on white, orange border on hover */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {LANDSCAPE_SERVICES.map(({ name, path, desc }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.03, background: '#FF8200' }}
                    transition={{ duration: 0.2 }}
                    className="bg-black/5 border-2 border-black/10 rounded-lg p-4 group cursor-pointer"
                    onClick={() => window.location.href = path}
                  >
                    <Link to={path} className="block">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#FF8200] group-hover:text-black shrink-0 mt-0.5 transition-colors" />
                        <div>
                          <p className="font-black text-black group-hover:text-black text-sm uppercase tracking-wide">{name}</p>
                          <p className="text-black/50 group-hover:text-black/80 text-xs mt-1 transition-colors">{desc}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <Link to="/contact" className="bg-black text-white px-8 py-4 rounded font-black hover:bg-[#FF8200] hover:text-black transition-colors flex items-center gap-2 uppercase tracking-wide text-sm shadow-md">
                  Get Started <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealSection>

            <RevealSection className="rounded-xl overflow-hidden shadow-2xl border-4 border-black h-[400px] lg:h-[600px] img-lift">
              <img src="/showcase.jpg" alt="Landscaping Projects" className="w-full h-full object-cover" />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 6. WHY US STRIPE — animated count-up stats */}
      <section className="bg-[#FF8200] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: 20, suffix: '+', label: 'Years of Experience' },
              { value: 500, suffix: '+', label: 'Jobs Completed' },
              { value: 100, suffix: '%', label: 'Satisfaction Guaranteed' },
            ].map(({ value, suffix, label }) => {
              // Inline animated counter per stat
              const countRef = React.useRef<HTMLSpanElement>(null);
              const startedRef = React.useRef(false);
              React.useEffect(() => {
                const el = countRef.current;
                if (!el) return;
                const observer = new IntersectionObserver(([entry]) => {
                  if (entry.isIntersecting && !startedRef.current) {
                    startedRef.current = true;
                    const start = Date.now();
                    const tick = () => {
                      const elapsed = Date.now() - start;
                      const progress = Math.min(elapsed / 1600, 1);
                      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                      el.textContent = Math.round(eased * value) + suffix;
                      if (progress < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                    observer.disconnect();
                  }
                }, { threshold: 0.5 });
                observer.observe(el);
                return () => observer.disconnect();
              }, []);
              return (
                <div key={label} className="flex flex-col items-center">
                  <span ref={countRef} className="text-6xl font-black text-black leading-none mb-2">0{suffix}</span>
                  <span className="text-black font-bold text-lg uppercase tracking-widest">{label}</span>
                </div>
              );
            })}
          </RevealSection>
        </div>
      </section>

      {/* 7. BOTTOM CTA BANNER — BLACK */}
      <section className="bg-black text-white py-28">
        <RevealSection className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-5xl text-white font-display font-black mb-6 uppercase leading-tight">
            READY TO TRANSFORM YOUR <span className="text-[#FF8200]">PROPERTY?</span>
          </h3>
          <p className="text-lg text-white/70 font-medium mb-12 max-w-2xl mx-auto">
            Contact us today for a free, no obligation quote. Our dedicated team is ready to tackle projects of any size with precision and care.
          </p>
          <Link
            to="/contact"
            className="btn-pulse px-12 py-5 rounded font-black text-lg uppercase tracking-wider shadow-xl inline-flex items-center gap-2"
          >
            Get Your Free Estimate <ArrowUpRight className="w-6 h-6" />
          </Link>
        </RevealSection>
      </section>

    </div>
  );
}
