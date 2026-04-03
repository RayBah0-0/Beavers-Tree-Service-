import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X } from 'lucide-react';

// ── 2. LIVE WHATSAPP CHAT WIDGET ──────────────────────────────
// ── 2. CALL WIDGET (REPLACED WHATSAPP) ──────────────────────────────
export function CallWidget() {
  const [open, setOpen] = useState(false);
  const phoneNumber = '919-358-2168';

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
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
                  <p className="text-black/70 text-xs font-medium mt-0.5">Professional Tree Care</p>
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
                  👋 Need a <strong>free estimate</strong>? Give us a call or text for fast and professional tree services in the Triangle.
                </p>
              </div>
              <a
                href={`tel:${phoneNumber}`}
                id="call-btn"
                className="flex items-center justify-center gap-2 w-full bg-black text-[#FF8200] font-black py-3 rounded-xl hover:bg-[#FF8200] hover:text-black transition-colors text-sm uppercase tracking-widest shadow-lg"
              >
                <Phone className="w-5 h-5 fill-current" />
                Call (919) 358-2168
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle bubble */}
      <motion.button
        id="call-toggle-btn"
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
              <Phone className="w-6 h-6" />
              <span className="font-black text-xs uppercase tracking-wider pr-1">Need a Quote?</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
