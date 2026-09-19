import { motion } from 'framer-motion';
import { AlignLeft, TrendingUp } from 'lucide-react';

export interface KnowledgeData {
  title: string;
  description: string;
  dataPoints: string[];
}

export const KnowledgeResult = ({ data }: { data?: KnowledgeData }) => {
  const content = data || {
    title: "NO DATA",
    description: "No factual data was provided to the component.",
    dataPoints: []
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center"
    >
      <div className="mb-10 flex flex-col items-center">
        <span className="text-xs font-bold tracking-widest text-engine-indigo uppercase mb-2">General Knowledge</span>
        <span className="text-sm text-engine-muted bg-engine-sky/30 px-3 py-1 rounded-full">Factual / Analytical query</span>
      </div>

      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", damping: 20 }}
        className="text-4xl md:text-6xl font-bold text-engine-text mb-12 tracking-tight text-center max-w-4xl leading-tight"
      >
        {content.title}
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-3xl bg-white/70 backdrop-blur-md border border-white p-8 rounded-3xl shadow-sm mb-8"
      >
        <div className="flex items-start gap-4">
          <AlignLeft className="text-engine-indigo shrink-0 mt-1" size={24} />
          <p className="text-lg text-engine-text leading-relaxed font-medium">
            {content.description}
          </p>
        </div>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
        {content.dataPoints.map((point, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + (index * 0.1) }}
            className="flex items-center gap-2 px-4 py-2 bg-white/40 border border-white/60 rounded-full shadow-sm text-sm text-engine-muted"
          >
            <TrendingUp size={16} className="text-engine-indigo" />
            <span>{point}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};