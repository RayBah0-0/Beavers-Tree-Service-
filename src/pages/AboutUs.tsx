import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight, CheckCircle2, Phone } from 'lucide-react';

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number; key?: React.Key }) {
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
      <img src="/icons/tree.png" alt="" className="silhouette-icon w-16 h-16 md:w-24 md:h-24 object-contain brightness-0" />
    </div>
  );
}

export default function AboutUs() {
  return (
    <div className="w-full font-sans text-black bg-white">

      {/* 1. SIGNATURE SILHOUETTE HEADER */}
      <section className="bg-white border-b-4 border-black overflow-hidden py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="silhouette-header">
            <SilhouetteSlide side="left" />
            <RevealSection className="flex flex-col items-center text-center flex-1 max-w-2xl">
              <span className="font-display font-bold uppercase tracking-widest text-[#FF8200] text-sm mb-2 block">
                Our Story
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-black text-black uppercase tracking-wide leading-tight">
                ABOUT US
              </h1>
            </RevealSection>
            <SilhouetteSlide side="right" />
          </div>
        </div>
      </section>

      {/* 2. FAMILY OWNED section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — stacked images with lift hover */}
            <RevealSection className="relative h-[580px] hidden md:block">
              <div className="absolute top-0 left-0 w-2/3 h-3/4 rounded overflow-hidden shadow-2xl border-4 border-white img-lift">
                <img src="/showcase (5).jpg" alt="Professional tree care" className="w-full h-full object-cover" width="800" height="600" />
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-3/4 rounded overflow-hidden shadow-2xl border-4 border-white z-10 img-lift">
                <img src="/showcase.jpg" alt="Lawn care and landscaping" className="w-full h-full object-cover" width="800" height="600" />
              </div>
            </RevealSection>

            {/* Right — text */}
            <RevealSection delay={150}>
              {/* 20+ Years badge — Bold Black block, Orange text — ANCHORED (not floating) */}
              <div className="years-badge mb-8">
                <span className="years-number">25+</span>
                <span className="years-label">Years Experience</span>
              </div>

              <div className="inline-flex items-center gap-2 border border-black/20 rounded px-4 py-2 mb-6 text-sm font-bold uppercase tracking-widest text-black">
                <ShieldCheck className="w-4 h-4" /> Who We Are
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-black text-black mb-6 leading-tight uppercase">
                YOUR LOCAL, FAMILY OWNED <span className="text-[#FF8200]">TREE EXPERTS</span>
              </h2>

              <p className="text-black/80 mb-6 font-medium text-[17px] leading-relaxed">
                Beavers Tree Service &amp; Landscaping Inc. is a local, family owned company based in North Carolina, proudly serving Raleigh, Cary, Apex, Clayton, Durham, Garner, Chapel Hill, and surrounding areas. With over 25 years of experience, we specialize in a wide range of residential tree and landscaping services including tree removal, trimming, cutting, storm cleanup, ornamental pruning, junk removal, and more.
              </p>

              <p className="text-black/80 mb-6 font-medium text-[17px] leading-relaxed">
                We have earned our reputation by putting customer satisfaction, safety, and honest work at the heart of everything we do. Our team is fully licensed and insured, and we offer fair, transparent pricing with free estimates to help homeowners make informed decisions without pressure.
              </p>

              <p className="text-black mb-10 font-bold text-[17px] leading-relaxed">
                Some tree and landscape jobs are too risky or complex to tackle alone — from working around power lines and fencing to protecting wildlife and your property. That is where our trained professionals come in.
              </p>

              <Link to="/contact" className="bg-black text-white px-8 py-4 rounded font-bold hover:bg-[#FF8200] transition-colors flex items-center gap-2 uppercase tracking-wide text-sm shadow-md w-fit">
                Contact Us <ArrowUpRight className="w-4 h-4" />
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 3. OUR GUARANTEE — "Bold Black Block with Orange Text" (per Edit 22) */}
      <section className="bg-black py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              {/* Anchored bold orange guarantee badge — top of section */}
              <div className="bg-[#FF8200] px-6 py-4 rounded mb-8 inline-flex items-center gap-4 shadow-lg">
                <img src="/icons/gardener.png" alt="" className="w-10 h-10 object-contain brightness-0" width="40" height="40" />
                <span className="font-display font-black text-black text-xl uppercase tracking-wide">Our Guarantee</span>
              </div>

              <h2 className="text-4xl md:text-5xl text-white font-display font-black mb-8 leading-tight uppercase">
                OUR GUARANTEE OF <span className="text-[#FF8200]">QUALITY</span>
              </h2>

              <div className="space-y-6 text-white/80 font-medium text-[17px] leading-relaxed mb-10">
                <p>
                  At Beavers Tree Service &amp; Landscaping Inc., we take pride in being a licensed and insured, family owned business with over 25 years of experience in the tree industry. We proudly serve the Triangle area of North Carolina, including Raleigh, Cary, Apex, Clayton, Durham, Garner, Chapel Hill, and nearby cities.
                </p>
                <p>
                  Our promise is simple: to deliver safe, fair, and high quality service with honesty and professionalism. Whether it is trimming, cutting, or full tree removal, we approach every job with care, precision, and a focus on customer satisfaction. We offer expert advice on whether a tree can be saved or should be removed — and when removal is necessary, we use the proper equipment and safety practices to handle the job efficiently.
                </p>
                <p>
                  We understand that every homeowner's needs are different, and we are here to help you protect your property while enhancing your landscape. We are also a bilingual team (English &amp; Spanish), ensuring clear communication and reliable service for a wider community. When you choose Beavers Tree Service &amp; Landscaping Inc., you are choosing local professionals who treat your property like our own.
                </p>
              </div>

              {/* Guarantee checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  'Licensed & Insured', 'Free Estimates', 'Bilingual Service', 'Family Owned',
                  'Fair Pricing', 'Professional Results'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-white font-bold">
                    <CheckCircle2 className="w-5 h-5 text-[#FF8200] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Link to="/contact" className="btn-pulse px-8 py-4 rounded font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 w-fit">
                Contact Us <ArrowUpRight className="w-4 h-4" />
              </Link>
            </RevealSection>

            <RevealSection delay={200} className="rounded overflow-hidden shadow-2xl h-[500px] lg:h-[700px] border-4 border-white/10 img-lift">
              <img src="/showcase (3).jpg" alt="Quality Tree Care — professional results" className="w-full h-full object-cover" width="600" height="800" loading="lazy" />
            </RevealSection>
          </div>
        </div>
      </section>

    </div>
  );
}
