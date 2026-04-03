import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Phone, ArrowUpRight, CheckCircle2, ShieldCheck, Mail, Play, ChevronDown, Star, TreeDeciduous, X, Send, Sprout, AlertCircle, Leaf, Trees } from 'lucide-react';
import { cn } from '../lib/utils';

// Confetti particle for success animation
function SuccessConfetti() {
  const particles = Array.from({ length: 28 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const dist = 80 + Math.random() * 80;
        const size = 6 + Math.random() * 10;
        const colors = ['#FF8200', '#000000', '#ffffff', '#FF8200', '#FF6B00'];
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * dist,
              y: Math.sin((angle * Math.PI) / 180) * dist,
              opacity: 0,
              scale: 0,
              rotate: 360
            }}
            transition={{ duration: 1.2, delay: i * 0.025, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: size,
              height: size,
              background: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
          />
        );
      })}
    </div>
  );
}

/* ── COUNT-UP HOOK ─────────────────────────────────────── */
function useCountUp(target: number, duration = 1600): [number, React.RefObject<HTMLSpanElement>] {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

function AnimatedStat({ value, suffix = '', label, dark = false }: { value: number; suffix?: string; label: string; dark?: boolean }) {
  const [count, ref] = useCountUp(value);
  return (
    <div className="flex flex-col items-center">
      <span ref={ref} className={`text-6xl md:text-7xl font-black leading-none mb-2 ${dark ? 'text-black' : 'text-white'}`}>
        {count}{suffix}
      </span>
      <span className={`font-bold text-lg uppercase tracking-widest ${dark ? 'text-black' : 'text-white/80'}`}>{label}</span>
    </div>
  );
}

const REVIEWS = [
  { name: 'Varun Ganotra', text: 'Really amazing job by the team sent to take out our trees. They were great at what they did, really hardworking folks. Would highly recommend!', date: '1 year ago' },
  { name: 'Paul Alger', text: "Couldn't be happier with the service provided showed up on time, left the area nice and clean when they were done. Great crew, great price!", date: '1 year ago' },
  { name: 'Adam Curtin', text: "Beavers Tree Service & Landscaping Inc. is fairly priced, professional, accommodating, and clean! I know that clean is an odd thing to note but they really left the yard spotless.", date: '1 year ago' },
  { name: 'Maria Lopez', text: 'Called them for an emergency after a storm knocked a huge tree onto my fence. They were there within 2 hours. Absolutely incredible response time!', date: '8 months ago' },
  { name: 'James Turner', text: 'Used them for stump grinding and sod installation. Both crews were professional and the yard looks absolutely beautiful. Very satisfied!', date: '6 months ago' },
  { name: 'Sandra Hill', text: 'Family owned business that treats you like family. Honest pricing, no surprises, and amazing results. These guys are the real deal in the Triangle.', date: '5 months ago' },
];

const FAQS = [
  { q: "Are you licensed and insured?", a: "Yes! Beavers Tree Service & Landscaping Inc. is fully licensed and insured for your peace of mind. Our team is trained to deliver safe, effective, and professional results on every job from start to finish. We are happy to provide documentation to all prospective clients." },
  { q: "Do you provide free estimates?", a: "Absolutely. We offer free, no obligation estimates for all services. Just call or text us at (919) 358-2168 and we will schedule a time to assess your property and provide a fair, transparent quote." },
  { q: "What areas do you serve?", a: "We proudly serve Raleigh, Cary, Apex, Clayton, Durham, Garner, Chapel Hill, and surrounding Triangle area communities in North Carolina." },
  { q: "Do you offer emergency tree service?", a: "Yes! We offer 24/7 emergency response for storm damaged or hazardous trees. When a tree threatens your home or family, we respond fast with the equipment and expertise to handle the situation safely." },
  { q: "Can you save a tree instead of removing it?", a: "Always our first goal. Our trained arborists evaluate every tree carefully. We will recommend trimming, cabling, or treatment whenever a tree can be preserved. Removal is only recommended when necessary for safety or property protection." },
  { q: "What landscaping services do you provide?", a: "We offer sod installation, paver installation, retaining wall installation, fence installation, and professional lawn maintenance for residential and commercial properties throughout the Triangle." },
  { q: "Are your services affordable?", a: "Yes. As a family owned company, we believe high quality tree care should be accessible to every homeowner. We offer competitive pricing, free estimates, and honest advice with no hidden fees." },
];

// Hook: scroll-triggered fade-rise animation
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('ag-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number; key?: React.Key }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('ag-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={cn('ag-fade-rise', className)}>
      {children}
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full font-sans text-black bg-white">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          <video autoPlay loop muted playsInline poster="/showcase (5).jpg" className="w-full h-full object-cover opacity-40 pointer-events-none">
            <source src="/Hero Video.mp4" type="video/mp4" />
            <source src="/Hero Video.MOV" type="video/quicktime" />
          </video>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-5 py-2 mb-8 bg-black/40 backdrop-blur-sm text-white text-sm font-bold tracking-widest uppercase"
          >
            <img src="/icons/tree.png" alt="" className="w-5 h-5 object-contain" width="20" height="20" />
            Welcome to Beavers Tree Service &amp; Landscaping Inc.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight tracking-tight"
          >
            EXPERT TREE &amp; LANDSCAPING <br /> SERVICES YOU CAN TRUST <br /> IN THE TRIANGLE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-white/90 font-medium mb-10 max-w-3xl"
          >
            Family owned, licensed, and insured with over 25 years of experience. Serving Raleigh, Cary, Clayton, Durham, Apex &amp; surrounding NC areas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="/contact" className="btn-pulse px-10 py-4 rounded font-black text-lg flex items-center gap-2 shadow-xl">
              Get Your Free Estimate <ArrowUpRight className="w-5 h-5" />
            </Link>
            <a href="tel:919-358-2168" className="contact-link bg-white text-black px-8 py-4 rounded font-bold hover:bg-black hover:text-[#FF8200] transition-all shadow-xl flex items-center gap-3">
              <Phone className="w-5 h-5 contact-icon" />
              (919) 358-2168
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT US / FAMILY OWNED */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — stacked images */}
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
              {/* 25+ Years badge with spacing from who we are pill */}
              <div className="years-badge mb-10 mx-auto lg:mx-0 font-sans">
                <span className="years-number">25+</span>
                <span className="years-label font-bold">Years Experience</span>
              </div>

              <div className="h-4" />{/* spacer between badge and pill */}

              <div className="inline-flex items-center gap-2 border border-black/20 rounded px-4 py-2 mb-6 text-sm font-bold uppercase tracking-widest text-black">
                <ShieldCheck className="w-4 h-4" /> Who We Are
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-black mb-6 leading-tight uppercase bg-black p-6 rounded shadow-sm">
                <span className="text-[#FF8200]">FAMILY OWNED &amp;</span>{' '}
                <span className="text-white">TRUSTED TREE CARE</span>
              </h2>

              <p className="text-black mb-6 font-medium text-lg leading-relaxed">
                Welcome to Beavers Tree Service &amp; Landscaping Inc., where we are more than just a tree company — we are your neighbors! With over 25 years of combined experience, our fully licensed and insured team provides safe, professional, and high quality care throughout the Triangle and beyond. We take great pride in offering bilingual service (English &amp; Spanish) to ensure every homeowner feels heard and supported.
              </p>
              <p className="text-black mb-10 font-medium text-lg leading-relaxed">
                Whether you need a simple trim or a complex crane assisted removal, we bring honesty, professionalism, and care to every project. We are excited to help you protect and beautify your property. Call or text us today for your free estimate!
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Link to="/about" className="bg-black text-white px-8 py-4 rounded font-bold hover:bg-[#FF8200] transition-colors flex items-center gap-2 uppercase tracking-wide text-sm shadow-md">
                  About Us <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a href="tel:919-358-2168" className="contact-link bg-[#FF8200] px-8 py-4 rounded font-bold hover:bg-black transition-colors flex items-center gap-3 shadow-md">
                  <div className="bg-white text-[#FF8200] p-1.5 rounded-full shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span style={{ color: '#ffffff' }} className="text-xs uppercase tracking-widest font-bold leading-none mb-1">CALL OR TEXT NOW</span>
                    <span style={{ color: '#ffffff' }} className="font-sans leading-none">(919) 358-2168</span>
                  </div>
                </a>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="bg-black py-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="inline-flex items-center gap-2 border border-white/20 rounded px-4 py-2 mb-6 text-sm font-bold uppercase tracking-widest text-white">
                <ShieldCheck className="w-4 h-4 text-[#FF8200]" /> Why Choose Us
              </div>
              <h2 className="text-4xl md:text-5xl text-white font-display font-black mb-12 uppercase leading-tight">
                LICENSED, INSURED, <br /> &amp; FAIR PRICING
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: 'Comprehensive Tree &amp; Landscape Care',
                    icon: '/icons/gardener.png',
                    body: 'From trimming and cutting to full tree removal, we handle all aspects of tree and yard maintenance with precision and care.'
                  },
                  {
                    title: 'Emergency 24/7 Response',
                    icon: 'check',
                    body: 'When storms strike, we are ready. Our team responds around the clock to protect your home and family from dangerous trees.'
                  },
                  {
                    title: 'Eco Conscious Approach',
                    icon: '/icons/earth.png',
                    body: 'We prioritize saving trees whenever possible, providing environmentally responsible care that keeps your landscape safe and beautiful.'
                  }
                ].map((item, i) => (
                  <RevealSection key={i} delay={i * 100}>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-[#FF8200] rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-lg border-2 border-white/20">
                        {item.icon === 'check' ? (
                          <CheckCircle2 className="w-6 h-6 text-black" />
                        ) : (
                          <img src={item.icon} alt="" className="w-8 h-8 object-contain" width="32" height="32" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white text-xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: item.title }} />
                        <p className="text-white/70 leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </RevealSection>

            <RevealSection delay={200} className="rounded overflow-hidden shadow-2xl h-[400px] lg:h-[600px] img-lift">
              <img src="/showcase (3).jpg" alt="Tree cutting professionals" className="w-full h-full object-cover" width="800" height="600" />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 4. SERVICES — Breathable vertical cards */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <RevealSection>
            <div className="inline-flex items-center justify-center gap-3 border border-black/20 rounded px-5 py-2.5 mb-6 text-lg font-black text-black uppercase tracking-[0.2em] bg-white/50">
              <ShieldCheck className="w-4 h-4" /> Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-black mb-4 uppercase leading-tight">
              COMPLETE TREE &amp; <br />
              <span className="text-[#FF8200]">LANDSCAPING SOLUTIONS</span>
            </h2>
            <p className="text-black/60 font-medium text-xl max-w-2xl mx-auto mb-16">
              From routine lawn care to complex crane assisted tree removal, we deliver expert results with every project.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {[
              {
                icon: <img src="/icons/tree.png" alt="" className="w-16 h-16 object-contain brightness-0 invert" />,
                title: 'Tree Services',
                desc: 'Professional tree trimming, pruning, removal, and stump grinding services to keep your property safe and beautiful year round.',
                path: '/services'
              },
              {
                icon: <img src="/icons/grass.png" alt="" className="w-16 h-16 object-contain brightness-0 invert" />,
                title: 'Landscaping Services',
                desc: 'From sod installation to retaining walls and expert lawn care, we build and maintain beautiful outdoor spaces.',
                path: '/services'
              }
            ].map((card, i) => (
              <RevealSection key={i} delay={i * 150}>
                <div className="bg-white p-12 rounded flex flex-col items-center text-center shadow-lg hover:-translate-y-2 transition-transform border-2 border-transparent hover:border-[#FF8200] duration-300">
                  <div className="bg-black p-6 rounded mb-8 shadow-xl text-white">
                    {card.icon}
                  </div>
                  <h3 className="text-3xl font-black text-black mb-5">{card.title}</h3>
                  <p className="text-black/75 mb-10 max-w-sm font-medium text-lg leading-relaxed">{card.desc}</p>
                  <Link to={card.path} className="bg-black text-white px-10 py-4 rounded font-bold hover:bg-[#FF8200] transition-colors flex items-center gap-2 text-sm uppercase tracking-wider shadow-md">
                    Read More <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </RevealSection>
            ))}
          </div>

          <Link to="/services" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded font-bold hover:bg-[#FF8200] transition-colors text-sm uppercase tracking-wider shadow-lg">
            See All Services <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. LATEST PROJECTS */}
      <section className="py-14 bg-white border-t border-black/5 text-center">
        <div className="max-w-screen-2xl mx-auto px-6">
          <RevealSection>
            <h2 className="text-4xl md:text-5xl font-display font-black text-black mb-4 uppercase leading-tight">
              OUR LATEST <span className="text-[#FF8200]">PROJECTS</span>
            </h2>
            <p className="text-black/60 font-medium text-lg mb-16 max-w-2xl mx-auto">
              Real results from real jobs — browse our recent work across the Triangle area.
            </p>
          </RevealSection>

          {/* Shadow-Mask Gallery — 2rem gap, expand on hover, dim siblings */}
          <div className="gallery-grid grid-cols-2 md:grid-cols-4 mb-14">
            {['showcase.jpg', 'showcase (5).jpg', 'showcase (3).jpg', 'showcase (6).jpg'].map((img, i) => (
              <RevealSection key={i} delay={i * 80} className="gallery-item aspect-[4/5] w-full overflow-hidden shadow-md rounded">
                <img src={`/${img}`} alt={`Beavers Tree Service & Landscaping Inc. project ${i + 1}`} className="w-full h-full object-cover" loading="lazy" width="400" height="500" />
              </RevealSection>
            ))}
          </div>

          <Link to="/gallery" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded font-bold hover:bg-[#FF8200] transition-colors text-sm uppercase tracking-wider shadow-lg">
            View All Projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. LATEST VIDEOS — real mp4 playback */}
      <VideoSection />

      {/* 7. FAQ */}
      <section className="bg-black text-white py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <RevealSection>
            <div className="inline-flex items-center justify-center gap-2 border border-white/20 rounded px-4 py-2 mb-6 text-sm font-bold uppercase tracking-widest text-white mx-auto">
              <ShieldCheck className="w-4 h-4 text-[#FF8200]" /> FAQ
            </div>
            <h2 className="text-white text-3xl md:text-5xl font-display font-black mb-12 uppercase leading-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </RevealSection>

          <div className="space-y-4 text-left">
            {FAQS.map((faq, i) => (
              <RevealSection key={i} delay={i * 60}>
                <div className="border border-white/20 rounded bg-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between font-bold text-lg hover:bg-white/5 transition-colors"
                    id={`faq-${i}`}
                  >
                    <span>{faq.q}</span>
                    <div className="bg-[#FF8200] text-white rounded p-1 shrink-0 ml-4">
                      <ChevronDown className={cn("w-4 h-4 transition-transform", openFaq === i ? "rotate-180" : "")} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-5"
                      >
                        <p className="text-white/75 font-medium pt-2 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS MARQUEE */}
      <section className="py-14 bg-black text-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <RevealSection>
            <div className="inline-flex items-center gap-2 border border-white/20 rounded px-4 py-2 mb-6 text-sm font-bold uppercase tracking-widest text-white">
              <ShieldCheck className="w-4 h-4 text-[#FF8200]" /> 5-Star Reviews
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4 uppercase leading-tight">
              WHAT PEOPLE SAY <span className="text-[#FF8200]">ABOUT US</span>
            </h2>
            <p className="text-white/50 font-medium">
              100% 5-star rated on Google — Triangle area's most trusted tree crew.
            </p>
          </RevealSection>
        </div>

        {/* Infinite marquee track */}
        <div className="relative" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
          <div className="flex gap-6 animate-marquee" style={{ width: 'max-content' }}>
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div
                key={i}
                className="w-80 shrink-0 bg-white/5 border border-white/10 hover:border-[#FF8200] transition-colors rounded-xl p-6 text-left"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#FF8200] rounded-full flex items-center justify-center font-black text-xl text-black">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-white text-sm">{review.name}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-white/70 text-sm font-medium leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <a
            href="https://www.google.com/search?q=Beavers+Tree+Service+Raleigh+NC+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF8200] text-black px-10 py-4 rounded font-black hover:bg-white transition-colors text-sm uppercase tracking-wider shadow-md"
          >
            Read All Reviews on Google <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>


      {/* 9. CTA FORM SECTION */}
      <HomeContactForm />

    </div>
  );
}

/* ─── VIDEO SECTION ───────────────────────────────── */
const VIDEO_DATA = [
  { src: '/Video1.MOV', thumb: '/showcase (6).jpg', label: 'Precision Tree Removal' },
  { src: '/Video2.MOV', thumb: '/showcase (7).jpg', label: 'Safety First Operations' },
  { src: '/Video3.MOV', thumb: '/showcase (8).jpg', label: 'Expert Stump Grinding' },
  { src: '/Video4.MOV', thumb: '/showcase (6).jpg', label: 'Lawn Restoration' },
  { src: '/Video5.MOV', thumb: '/showcase (7).jpg', label: 'Triangle Area Maintenance' },
  { src: '/Video6.MOV', thumb: '/showcase (8).jpg', label: 'Emergency Response Team' },
  { src: '/Video13.MOV', thumb: '/showcase (6).jpg', label: 'Site Restoration' },
  { src: '/Video14.MOV', thumb: '/showcase (7).jpg', label: 'Tree Care Specialists' },
];

function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (activeVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => { });
    }
  }, [activeVideo]);

  return (
    <section className="py-14 bg-white text-center border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 border border-black/20 rounded px-4 py-2 mb-6 text-sm font-bold uppercase tracking-widest text-black bg-white">
          <Play className="w-4 h-4 text-[#FF8200]" fill="currentColor" /> Our Work In Action
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-black text-black mb-4 uppercase leading-tight">
          OUR LATEST <span className="text-[#FF8200]">VIDEOS</span>
        </h2>
        <p className="text-black/60 font-medium text-lg mb-16 max-w-2xl mx-auto">
          Watch our crews in action — from precision pruning to complex crane removals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {VIDEO_DATA.map((vid, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              onClick={() => { setActiveVideo(vid.src); setActiveLabel(vid.label); }}
              className="aspect-video w-full bg-black relative overflow-hidden group cursor-pointer rounded-lg shadow-xl border-2 border-[#FF8200]/20 hover:border-[#FF8200] transition-all"
            >
                <img
                src={vid.thumb}
                alt={vid.label}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                width="400"
                height="225"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Play button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FF8200] p-5 rounded-full border-4 border-white shadow-2xl"
                >
                  <Play className="w-10 h-10 text-white" fill="currentColor" />
                </motion.div>
                <span className="text-white font-black text-sm uppercase tracking-wider drop-shadow-lg">{vid.label}</span>
              </div>
              {/* Orange bottom border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FF8200] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}
        </div>

        <Link to="/gallery" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded font-bold hover:bg-[#FF8200] transition-colors text-sm uppercase tracking-wider shadow-lg">
          View All Projects <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* VIDEO LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              transition={{ type: 'spring', bounce: 0.28 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-5xl mx-4"
            >
              <video
                ref={videoRef}
                src={activeVideo}
                controls
                autoPlay
                playsInline
                className="w-full rounded-xl shadow-2xl border-4 border-[#FF8200]"
                style={{ maxHeight: '80vh' }}
              />
              <div className="mt-4 text-center">
                <span className="inline-block bg-[#FF8200] text-black font-black uppercase tracking-widest text-sm px-6 py-2 rounded">
                  {activeLabel}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-5 -right-5 bg-[#FF8200] text-white rounded-full p-2 shadow-xl hover:bg-black hover:text-[#FF8200] transition-colors border-4 border-white"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── HOME CONTACT FORM ───────────────────────────── */
function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
    />
  );
}

function HomeContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', description: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/xnjgyvpl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contactInfo: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.description,
          _subject: `Home Page Request from ${formData.name}`
        })
      });
      if (res.ok) {
        setStatus('success');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      } else {
        setStatus('error');
        setErrorMessage("Submission failed. Please try again or call us directly.");
      }
    } catch {
      setStatus('error');
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Copy */}
          <div className="py-20 pr-0 lg:pr-16">
            <div>
              <div className="inline-flex items-center gap-2 border border-white/20 rounded px-4 py-2 mb-6 text-sm font-bold tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4 text-[#FF8200]" /> Ready for Reliable Tree Service?
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 uppercase leading-tight">
                FAIR, TRANSPARENT <span className="text-[#FF8200]">PRICING</span>
              </h2>
              <p className="text-white/80 font-medium mb-10 max-w-md text-lg leading-relaxed">
                Do not wait until a tree becomes a hazard. Call us today for fast, honest, and professional service.
              </p>
              <Link to="/contact" className="btn-pulse px-8 py-4 rounded font-bold mb-12 shadow-xl text-sm uppercase tracking-wider inline-flex items-center gap-2">
                Get Your Free Estimate <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="rounded overflow-hidden shadow-2xl border-4 border-white/10 aspect-video mt-6">
                <img src="/showcase (6).jpg" alt="Service Trucks Ready" className="w-full h-full object-cover" width="600" height="400" loading="lazy" />
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-black p-10 md:p-16 lg:py-20 h-full border-l-8 border-[#FF8200]">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="relative flex flex-col items-center justify-center text-center py-16 min-h-[500px]"
                >
                  {showConfetti && <SuccessConfetti />}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.1, bounce: 0.7 }}
                    className="w-28 h-28 rounded-full bg-[#FF8200] border-8 border-white flex items-center justify-center mb-8 shadow-2xl"
                  >
                    <CheckCircle2 className="w-14 h-14 text-white" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-black text-white uppercase mb-4"
                  >
                    Request Sent!!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="text-white/70 text-lg font-medium mb-10 max-w-sm"
                  >
                    We will reach out shortly with your free estimate. Thank you for choosing Beavers Tree Service & Landscaping Inc.!
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-[#FF8200] font-black uppercase tracking-widest hover:underline"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-white font-display font-black text-3xl mb-8 uppercase">Send Us a Message</h3>

                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500/50 rounded p-4 mb-6 flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-red-200 text-sm font-medium">{errorMessage}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-lg">
                    {[
                      { label: 'Name', key: 'name', type: 'text', req: true },
                      { label: 'Phone or Email', key: 'email', type: 'text', req: true },
                      { label: 'Phone (Internal)', key: 'phone', type: 'tel', req: false },
                      { label: 'Address', key: 'address', type: 'text', req: false },
                    ].map(({ label, key, type, req }) => (
                      <div key={label}>
                        <label htmlFor={`field-${key}`} className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">
                          {label} {req && <span className="text-[#FF8200]">*</span>}
                        </label>
                        <input
                          id={`field-${key}`}
                          type={type}
                          className="form-field"
                          required={req}
                          value={formData[key as keyof typeof formData]}
                          onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                        />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="field-description" className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">
                        Description of The Work <span className="text-[#FF8200]">*</span>
                      </label>
                      <textarea
                        id="field-description"
                        rows={4}
                        className="form-field resize-none"
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={status === 'submitting'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-pulse w-full py-5 rounded-lg font-black uppercase tracking-widest text-lg shadow-xl mt-2 flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                      <AnimatePresence mode="wait">
                        {status === 'submitting' ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-3"
                          >
                            <LoadingSpinner />
                            <span>Sending...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-3"
                          >
                            <Send className="w-5 h-5" />
                            <span>Submit Estimate Request</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {/* Pulse ring effect during idle */}
                      {status === 'idle' && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 bg-white/20 pointer-events-none"
                        />
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
