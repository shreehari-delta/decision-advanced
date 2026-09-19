import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

interface TrustPanelProps {
  domain: string;
}

export const TrustPanel = ({ domain }: TrustPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const content = domain === 'quantitative' ? {
    interpreted: "Mathematical feasibility calculation based on speed, distance, and time.",
    method: "Deterministic calculation",
    limitations: "Assumes constant velocity without accounting for human fatigue, terrain changes, or acceleration.",
    important: null
  } : {
    interpreted: "Multi-variable lifestyle and career decision.",
    method: "Reflective framework",
    limitations: null,
    important: "No single correct answer. This system highlights trade-offs to assist human judgment, rather than providing an absolute directive."
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-float"
          >
            <div className="flex justify-between items-start mb-6">
              <h4 className="text-xs font-bold tracking-widest text-engine-indigo uppercase">System Reasoning</h4>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-engine-muted hover:text-engine-text transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-xs text-engine-muted mb-1">Input interpreted as:</span>
                <span className="font-medium text-engine-text leading-relaxed">{content.interpreted}</span>
              </div>
              
              <div className="h-px bg-engine-sky/50 w-full my-3" />
              
              <div>
                <span className="block text-xs text-engine-muted mb-1">Method:</span>
                <span className="font-medium text-engine-text">{content.method}</span>
              </div>

              {content.limitations && (
                <>
                  <div className="h-px bg-engine-sky/50 w-full my-3" />
                  <div>
                    <span className="block text-xs text-engine-muted mb-1">Limitations:</span>
                    <span className="font-medium text-engine-text leading-relaxed">{content.limitations}</span>
                  </div>
                </>
              )}

              {content.important && (
                <>
                  <div className="h-px bg-engine-sky/50 w-full my-3" />
                  <div className="bg-engine-sky/30 p-3 rounded-xl border border-engine-sky/50">
                    <span className="block text-xs text-engine-indigo font-bold mb-1 uppercase tracking-wider">Important</span>
                    <span className="font-medium text-engine-text leading-relaxed">{content.important}</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-3 bg-white/70 backdrop-blur-md border border-white shadow-glass rounded-full text-sm font-medium text-engine-muted hover:text-engine-indigo transition-colors"
      >
        <Info size={16} />
        Why this answer?
      </motion.button>
    </div>
  );
};