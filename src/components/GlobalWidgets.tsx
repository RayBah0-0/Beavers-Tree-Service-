import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X, MessageSquare } from 'lucide-react';

export function CallWidget() {
  const [open, setOpen] = useState(false);
  const phoneNumber = '919-358-2168';

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[90] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.32, duration: 0.45 }}
            className="bg-white rounded-2xl shadow-2xl border border-black/10 w-72 overflow-hidden"
            style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06)' }}
          >
            {/* Header */}
            <div className="bg-black px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#FF8200] flex items-center justify-center font-black text-black text-lg">B</div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-black rounded-full" />
                </div>
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-wide leading-none">Beavers Tree Service</p>
                  <p className="text-green-400 text-xs font-bold mt-0.5 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full" />Online Now
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message bubble */}
            <div className="px-5 pt-5 pb-3 bg-gray-50">
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-black/5 mb-5">
                <p className="text-black text-sm font-medium leading-relaxed">
                  👋 Hey! Ready to get a <strong>free estimate</strong>? Give us a call or send a text — we're quick to respond!
                </p>
              </div>

              <div className="flex flex-col gap-2 pb-2">
                <a
                  href={`tel:${phoneNumber}`}
                  id="call-btn"
                  className="flex items-center justify-center gap-2.5 w-full bg-[#FF8200] text-black font-black py-3 rounded-xl hover:bg-black hover:text-[#FF8200] transition-colors text-sm uppercase tracking-widest shadow-md"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  Call (919) 358-2168
                </a>
                <a
                  href={`sms:${phoneNumber}`}
                  id="text-btn"
                  className="flex items-center justify-center gap-2.5 w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-neutral-800 transition-colors text-sm uppercase tracking-widest"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send a Text
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle bubble */}
      <motion.button
        id="call-toggle-btn"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative bg-[#FF8200] text-black rounded-full shadow-2xl border-4 border-black flex items-center gap-2 pr-4 pl-3 py-3"
        style={{ boxShadow: '0 0 0 0px rgba(255,130,0,0), 0 16px 40px rgba(0,0,0,0.35)' }}
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full border-2 border-[#FF8200] animate-ping opacity-30 pointer-events-none" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-black" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="font-black text-xs uppercase tracking-wider">Free Quote?</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
