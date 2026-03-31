import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header
      className="w-full sticky top-0 z-50 transition-all duration-300"
      style={{ boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.25)' : 'none' }}
    >
      {/* ── TOP BAR: Logo + Contact — collapses smoothly on scroll ── */}
      <div
        className="bg-white border-b border-black/10 hidden lg:block overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: scrolled ? '0px' : '88px', opacity: scrolled ? 0 : 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src="/Logo with text.png" alt="Beavers Tree Service Logo" className="h-16 w-auto object-contain" />
          </Link>

          <div className="flex items-center gap-6">
            <a href="tel:919-358-2168" className="contact-link flex items-center gap-4 bg-orange-50 px-6 py-3 rounded group hover:bg-[#FF8200] transition-colors">
              <div className="bg-[#FF8200] p-2 rounded text-white group-hover:bg-white group-hover:text-[#FF8200] transition-colors">
                <Phone className="w-6 h-6 contact-icon" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black/60 uppercase tracking-widest group-hover:text-white transition-colors">Call Now</span>
                <span className="font-black text-[#FF8200] group-hover:text-white transition-colors text-lg">919-358-2168</span>
              </div>
            </a>

            <a href="mailto:beaverstreeservicenc@gmail.com" className="contact-link flex items-center gap-4 bg-orange-50 px-6 py-3 rounded group hover:bg-[#FF8200] transition-colors">
              <div className="bg-[#FF8200] p-2 rounded text-white group-hover:bg-white group-hover:text-[#FF8200] transition-colors">
                <Mail className="w-6 h-6 contact-icon" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black/60 uppercase tracking-widest group-hover:text-white transition-colors">Get In Touch</span>
                <span className="font-bold text-[#FF8200] group-hover:text-white transition-colors">beaverstreeservicenc@gmail.com</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV BAR: Black with orange bottom border ── */}
      <div className="bg-black border-b-4 border-[#FF8200]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between lg:justify-center h-14">

            {/* Mobile: Logo + Toggle */}
            <div className="flex items-center justify-between w-full lg:hidden">
              <Link to="/" className="flex-shrink-0 bg-white p-2 rounded my-1">
                <img src="/Logo with text.png" alt="Beavers Tree Service Logo" className="h-8 w-auto object-contain" />
              </Link>
              <button className="text-white p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group/nav">
                  <Link
                    to={link.path}
                    className={cn(
                      'font-display font-bold text-sm tracking-widest uppercase transition-colors px-2 py-4 flex items-center gap-1',
                      location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)
                        ? 'text-[#FF8200]'
                        : 'text-white hover:text-[#FF8200]'
                    )}
                  >
                    {link.name}
                    {link.name === 'Services' && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Services Dropdown */}
                  {link.name === 'Services' && (
                    <div className="absolute top-full left-0 mt-0 w-[520px] bg-[#FF8200] shadow-2xl rounded-b opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform origin-top grid grid-cols-2 p-2 pointer-events-none group-hover/nav:pointer-events-auto z-50">
                      <div className="flex flex-col border-r border-black/15">
                        <span className="font-display font-black text-black/80 uppercase tracking-widest text-xs px-6 pt-6 pb-2">Tree Services</span>
                        <Link to="/services/tree-removal" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/15 transition-colors">Tree Removal</Link>
                        <Link to="/services/emergency-services" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/15 transition-colors">Emergency Services</Link>
                        <Link to="/services/tree-trimming" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/15 transition-colors">Tree Trimming &amp; Pruning</Link>
                        <Link to="/services/stump-grinding" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/15 transition-colors">Stump Grinding Services</Link>
                        <Link to="/services/crane-tree-service" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/15 transition-colors">Crane Tree Service</Link>
                        <Link to="/services/lot-clearing" className="font-sans font-bold text-white px-6 pb-6 pt-3 hover:bg-black/15 transition-colors">Lot Clearing</Link>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display font-black text-black/80 uppercase tracking-widest text-xs px-6 pt-6 pb-2">Landscaping Services</span>
                        <Link to="/services/sod-installation" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/15 transition-colors">Sod Installation</Link>
                        <Link to="/services/paver-installation" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/15 transition-colors">Paver Installation</Link>
                        <Link to="/services/retaining-wall-installation" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/15 transition-colors">Retaining Wall Installation</Link>
                        <Link to="/services/fence-installation" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/15 transition-colors">Fence Installation</Link>
                        <Link to="/services/lawn-maintenance" className="font-sans font-bold text-white px-6 pb-6 pt-3 hover:bg-black/15 transition-colors">Lawn Maintenance</Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-b-4 border-[#FF8200] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-lg font-bold uppercase tracking-wider text-white hover:text-[#FF8200] py-2 border-b border-white/10"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-6 pb-2">
                <a
                  href="tel:919-358-2168"
                  style={{ color: '#000000' }}
                  className="w-full flex items-center justify-center gap-3 bg-[#FF8200] py-4 px-6 rounded-xl font-black text-base uppercase tracking-widest shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="w-5 h-5 shrink-0 text-black" />
                  <span style={{ color: '#000000' }}>Call (919) 358-2168</span>
                </a>
                <a
                  href="mailto:beaverstreeservicenc@gmail.com"
                  className="w-full flex items-center justify-center gap-3 border-2 border-[#FF8200] text-[#FF8200] py-4 px-6 rounded-xl font-bold text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <Mail className="w-5 h-5 shrink-0" />
                  <span className="truncate">beaverstreeservicenc@gmail.com</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
