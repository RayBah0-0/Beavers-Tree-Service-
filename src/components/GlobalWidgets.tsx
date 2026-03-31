import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X } from 'lucide-react';

// ── 2. LIVE WHATSAPP CHAT WIDGET ──────────────────────────────
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const phoneNumber = '19193582168';
  const prefilledMsg = encodeURIComponent("Hi! I'd like to get a free quote for tree/landscaping services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${prefilledMsg}`;

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ type: 'spring', bounce: 0.35 }}
            className="bg-white rounded-2xl shadow-2xl border-2 border-[#FF8200] w-72 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#FF8200] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#FF8200]" />
                </div>
                <div>
                  <p className="font-black text-black text-sm uppercase tracking-wide leading-none">Beavers Tree Service</p>
                  <p className="text-black/70 text-xs font-medium mt-0.5">Usually replies within minutes</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-black hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Chat bubble */}
            <div className="p-5 bg-gray-50">
              <div className="bg-white rounded-xl rounded-tl-none p-4 shadow-sm border border-black/5 mb-4">
                <p className="text-black text-sm font-medium leading-relaxed">
                  👋 Hey there! Need a <strong>free estimate</strong> for tree removal, trimming, or landscaping? We're just a message away!
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="chat-whatsapp-btn"
                className="flex items-center justify-center gap-2 w-full bg-[#FF8200] text-black font-black py-3 rounded-xl hover:bg-black hover:text-[#FF8200] transition-colors text-sm uppercase tracking-widest"
              >
                {/* WhatsApp icon inline SVG */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle bubble */}
      <motion.button
        id="chat-toggle-btn"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative bg-[#FF8200] text-black rounded-full p-4 shadow-2xl border-4 border-black flex items-center gap-2"
        style={{ boxShadow: '0 0 0 4px rgba(255,130,0,0.2), 0 16px 40px rgba(0,0,0,0.35)' }}
      >
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
              <span className="font-black text-xs uppercase tracking-wider pr-1">Need a Quote?</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
