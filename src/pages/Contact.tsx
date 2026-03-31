import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Phone, Mail, MapPin, TreeDeciduous, ArrowUpRight } from 'lucide-react';

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

/* Full-page burst confetti */
function PageConfetti() {
  const count = 50;
  const colors = ['#FF8200', '#ffffff', '#000000', '#FF6B00', '#FFB347'];
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const startX = Math.random() * 100;
        const size = 8 + Math.random() * 14;
        const color = colors[i % colors.length];
        const delay = Math.random() * 0.5;
        const duration = 1.8 + Math.random() * 1.2;
        const x = (Math.random() - 0.5) * 800;
        const shape = Math.random() > 0.4 ? '50%' : '2px';
        return (
          <motion.div
            key={i}
            initial={{ x: `${startX}vw`, y: '40vh', opacity: 1, scale: 1, rotate: 0 }}
            animate={{ x: `calc(${startX}vw + ${x}px)`, y: '-20vh', opacity: 0, scale: 0.3, rotate: 720 }}
            transition={{ duration, delay, ease: 'easeOut' }}
            style={{ position: 'absolute', width: size, height: size, background: color, borderRadius: shape }}
          />
        );
      })}
    </div>
  );
}

/* Full-page success overlay */
function SuccessOverlay({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black"
    >
      <PageConfetti />
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Giant checkmark */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.65, delay: 0.15 }}
          className="w-40 h-40 rounded-full bg-[#FF8200] border-8 border-white flex items-center justify-center mb-10 shadow-[0_0_80px_rgba(255,130,0,0.6)]"
        >
          <CheckCircle2 className="w-20 h-20 text-white" strokeWidth={2.5} />
        </motion.div>

        {/* Title — staggered reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.4 }}
        >
          <p className="text-[#FF8200] font-black text-sm uppercase tracking-[0.3em] mb-4">Estimate Request Received</p>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase leading-tight mb-6">
            YOU'RE ALL<br />
            <span className="text-[#FF8200]">SET!</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-white/70 text-xl font-medium leading-relaxed mb-12 max-w-md"
        >
          Our team will be in touch with your <strong className="text-white">FREE estimate</strong> within the hour. We appreciate you choosing Beavers Tree Service!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', bounce: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="tel:919-358-2168"
            className="bg-[#FF8200] text-black px-10 py-5 rounded font-black text-lg uppercase tracking-widest shadow-2xl hover:bg-white transition-colors flex items-center gap-3"
          >
            <Phone className="w-6 h-6" />
            Call Us Now
          </a>
          <button
            onClick={onReset}
            className="text-white/50 font-bold hover:text-white transition-colors uppercase tracking-widest text-sm"
          >
            Back to Contact Page
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('https://formspree.io/f/xnjgyvpl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: formData.subject || 'New Contact Form Submission',
          message: formData.message
        })
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('idle');
        alert("Oops! There was a problem submitting your form. Please try again.");
      }
    } catch {
      setStatus('idle');
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="w-full font-sans text-black bg-white relative">

      {/* FULL-PAGE DRAMATIC SUCCESS OVERLAY */}
      <AnimatePresence>
        {status === 'success' && (
          <SuccessOverlay onReset={() => setStatus('idle')} />
        )}
      </AnimatePresence>

      {/* 1. SIGNATURE SILHOUETTE HEADER */}
      <section className="bg-white border-b-4 border-black overflow-hidden py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="silhouette-header">
            <SilhouetteSlide side="left" />
            <RevealSection className="flex flex-col items-center text-center flex-1 max-w-2xl">
              <span className="font-display font-bold uppercase tracking-widest text-[#FF8200] text-sm mb-2 block">
                Reach Out
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-black text-black uppercase tracking-wide leading-tight">
                CONTACT US
              </h1>
            </RevealSection>
            <SilhouetteSlide side="right" />
          </div>
        </div>
      </section>

      {/* 2. FORM & INFO — Breathable vertical stacked layout */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* LEFT — Contact Info */}
            <RevealSection className="flex flex-col items-start">
              <h2 className="text-4xl md:text-5xl font-display font-black text-black mb-6 leading-tight uppercase">
                GET YOUR FREE <br />
                <span className="text-[#FF8200]">ESTIMATE TODAY</span>
              </h2>
              <p className="text-black/75 mb-10 font-medium text-[17px] leading-relaxed">
                Need tree removal, trimming, or storm damage cleanup? Contact Beavers Tree Service &amp; Landscaping Inc. We respond quickly, offer transparent pricing, and use safe, reliable practices for every job.
              </p>

              <div className="space-y-5 w-full">
                {/* Phone */}
                <div className="flex items-center gap-4 bg-white p-6 rounded shadow-sm border-2 border-black/5 hover:border-[#FF8200] transition-colors group">
                  <div className="bg-[#FF8200] p-4 rounded text-white group-hover:scale-105 transition-transform">
                    <Phone className="w-8 h-8 contact-icon" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-black/40 uppercase tracking-widest">Call or Text</span>
                    <a href="tel:919-358-2168" className="contact-link font-black text-2xl text-black hover:text-[#FF8200]">
                      (919) 358-2168
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 bg-white p-6 rounded shadow-sm border-2 border-black/5 hover:border-[#FF8200] transition-colors group">
                  <div className="bg-[#FF8200] p-4 rounded text-white group-hover:scale-105 transition-transform">
                    <Mail className="w-8 h-8 contact-icon" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-black/40 uppercase tracking-widest">Email Us</span>
                    <a href="mailto:beaverstreeservicenc@gmail.com" className="contact-link font-bold text-lg text-black hover:text-[#FF8200] truncate">
                      beaverstreeservicenc@gmail.com
                    </a>
                  </div>
                </div>

                {/* Service Areas */}
                <div className="flex items-center gap-4 bg-white p-6 rounded shadow-sm border-2 border-black/5 hover:border-[#FF8200] transition-colors group">
                  <div className="bg-[#FF8200] p-4 rounded text-white group-hover:scale-105 transition-transform">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-black/40 uppercase tracking-widest">Service Areas</span>
                    <span className="font-bold text-lg text-black">Raleigh, Cary, Apex, Durham, <br />Clayton, Chapel Hill &amp; More</span>
                  </div>
                </div>
              </div>

              {/* Direct CTA */}
              <a
                href="tel:919-358-2168"
                className="btn-pulse w-full mt-8 px-8 py-5 rounded font-black uppercase tracking-widest text-lg shadow-xl flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6 contact-icon" />
                Call (919) 358-2168 Now
              </a>
            </RevealSection>

            {/* RIGHT — Contact Form with orange glow inputs */}
            <RevealSection delay={150}>
              <div className="bg-black p-10 md:p-14 rounded shadow-2xl border-t-8 border-[#FF8200]">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2, bounce: 0.6 }}
                      className="w-24 h-24 bg-[#FF8200]/20 border-4 border-[#FF8200] rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-12 h-12 text-[#FF8200]" />
                    </motion.div>
                    <h3 className="text-3xl font-black text-white mb-4 uppercase">Message Received!</h3>
                    <p className="text-white/70 text-lg mb-8 font-medium">
                      Thank you for reaching out. We will get back to you shortly with your free estimate.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-[#FF8200] font-bold hover:underline uppercase tracking-widest"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <h3 className="text-white font-display font-black text-3xl mb-2 uppercase">
                      Send Us a Message
                    </h3>
                    <p className="text-white/50 text-sm mb-4 font-medium">
                      We typically respond within a few hours.
                    </p>

                    {/* Name */}
                    <div>
                      <label className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">
                        Name <span className="text-[#FF8200]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-field"
                        placeholder="Your full name"
                        required
                        id="contact-name"
                      />
                    </div>

                    {/* Phone or Email */}
                    <div>
                      <label className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">
                        Phone or Email <span className="text-[#FF8200]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-field"
                        placeholder="Phone number or email address"
                        required
                        id="contact-email"
                      />
                    </div>

                    {/* Service Needed */}
                    <div>
                      <label className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">
                        Service Needed <span className="text-[#FF8200]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="form-field"
                        placeholder="Tree Removal, Trimming, Sod Installation, etc."
                        required
                        id="contact-service"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-white font-bold text-sm mb-2 uppercase tracking-wide">
                        Message <span className="text-[#FF8200]">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="form-field resize-none"
                        placeholder="Describe the job or your property..."
                        required
                        id="contact-message"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      id="contact-submit"
                      className="btn-pulse w-full py-5 rounded font-black uppercase tracking-widest text-lg shadow-xl mt-2 flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      {status === 'submitting' ? 'SENDING...' : 'GET YOUR FREE ESTIMATE'}
                    </button>
                  </form>
                )}
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

    </div>
  );
}
