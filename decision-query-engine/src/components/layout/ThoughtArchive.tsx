import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export const ThoughtArchive = () => {
  const history = [
    { query: "Can I run 10 km in 68 minutes?", domain: "QUANTITATIVE" },
    { query: "Should I take the new job?", domain: "REFLECTIVE" },
    { query: "What is the capital of Japan?", domain: "KNOWLEDGE" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="hidden xl:flex flex-col absolute left-8 top-1/2 -translate-y-1/2 w-72 z-20"
    >
      <div className="flex items-center gap-2 mb-6 px-4">
        <Clock size={16} className="text-engine-indigo" />
        <h3 className="text-xs font-bold tracking-widest text-engine-muted uppercase">
          Thought Archive
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {history.map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            className="p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/80 shadow-sm cursor-pointer transition-colors"
          >
            <p className="text-[10px] font-bold tracking-widest text-engine-indigo uppercase mb-2">
              {item.domain}
            </p>
            <p className="text-sm font-medium text-engine-text leading-relaxed">
              "{item.query}"
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};