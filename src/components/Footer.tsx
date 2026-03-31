import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t-4 border-[#FF8200] pt-20 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-8 bg-white/5 p-4 rounded border border-white/10 hover:border-[#FF8200]/50 transition-colors">
              <img
                src="/Logo with text.png"
                alt="Beavers Tree Service Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-white/70 font-sans max-w-sm leading-relaxed mb-6 text-base">
              Professional tree removal, trimming, and emergency storm services. We respond quickly and handle every job safely from start to finish.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#FF8200]" />
                20+ Years Experience
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#FF8200]" />
                Licensed &amp; Insured
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#FF8200]" />
                Family Owned &amp; Operated
              </div>
            </div>
          </div>

          {/* Contact Column — Stihl Orange links with ring animation */}
          <div>
            <h4 className="font-display font-black text-xl mb-6 text-white uppercase tracking-wide">Contact Us</h4>
            <ul className="space-y-6">
              <li>
                <a href="tel:919-358-2168" className="contact-link flex items-center gap-3 group">
                  <Phone className="w-6 h-6 contact-icon text-[#FF8200] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-widest mb-0.5">Call or Text</span>
                    <span className="text-[#FF8200] text-xl font-black group-hover:font-black">(919) 358-2168</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:beaverstreeservicenc@gmail.com" className="contact-link flex items-center gap-3 group">
                  <Mail className="w-6 h-6 contact-icon text-[#FF8200] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-widest mb-0.5">Email</span>
                    <span className="text-[#FF8200] font-bold text-sm break-all">beaverstreeservicenc@gmail.com</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-[#FF8200] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest mb-0.5">Service Areas</span>
                  <span className="text-[#FF8200] font-bold leading-relaxed">Raleigh, Cary, Apex, Durham, Clayton, Chapel Hill &amp; More</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-black text-xl mb-6 text-white uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Tree Services', path: '/services' },
                { label: 'Landscaping', path: '/services' },
                { label: 'Project Gallery', path: '/gallery' },
                { label: 'Free Estimate', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF8200] shrink-0" />
                  <Link to={path} className="text-white hover:text-[#FF8200] transition-colors font-bold font-sans">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm font-sans">
            © {new Date().getFullYear()} Beavers Tree Service &amp; Landscaping Inc. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-sans">
            Serving Raleigh, NC &amp; The Triangle Area
          </p>
        </div>
      </div>
    </footer>
  );
}
