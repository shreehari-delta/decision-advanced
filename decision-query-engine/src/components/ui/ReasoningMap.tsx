import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Compass, Layers, GitBranch, CheckCircle2 } from 'lucide-react';

interface ReasoningMapProps {
  domain: string;
}

export const ReasoningMap: React.FC<ReasoningMapProps> = ({ domain }) => {
  const steps = [
    {
      title: 'QUESTION',
      subtitle: 'Initial parsing',
      icon: Cpu,
    },
    {
      title: domain ? `${domain.toUpperCase()} DOMAIN` : 'ROUTED DOMAIN',
      subtitle: 'Domain routed',
      icon: Compass,
    },
    {
      title: 'EXTRACTION',
      subtitle: 'Variables: Money, Time',
      icon: Layers,
    },
    {
      title: 'FRAMEWORK',
      subtitle: 'Trade-off Analysis',
      icon: GitBranch,
    },
    {
      title: 'RESULT',
      subtitle: 'Structured perspectives',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto my-12 p-6 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-3xl">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6 text-center">
        How this answer was formed
      </h3>

      <div className="relative flex flex-col items-center space-y-4">
        {/* Connecting vertical line */}
        <div className="absolute top-6 bottom-6 w-0.5 bg-blue-200/60 z-0" />

        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 w-full bg-white/80 backdrop-blur-md border border-white/80 shadow-sm rounded-2xl p-4 flex items-center space-x-4 transition-all hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-inner">
                <IconComponent size={20} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 tracking-wider">
                  {step.title}
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  {step.subtitle}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};