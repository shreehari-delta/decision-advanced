import { motion } from 'framer-motion';
import { AlertCircle, Activity, Info, ShieldAlert } from 'lucide-react';

export const HealthResult = () => {
  const sections = [
    {
      title: "Possible Explanations",
      icon: Activity,
      content: "Tension-type headaches, dehydration, inadequate sleep, or eye strain are common causes of persistent mild-to-moderate headaches.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "What Information Matters",
      icon: Info,
      content: "Duration, exact location of pain, type of pain (throbbing, dull, sharp), and any accompanying symptoms (nausea, light sensitivity).",
      color: "text-engine-indigo",
      bg: "bg-engine-indigo/10"
    },
    {
      title: "Warning Signs",
      icon: AlertCircle,
      content: "Sudden severe pain, fever, stiff neck, confusion, vision changes, or numbness.",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "When to Seek Care",
      icon: ShieldAlert,
      content: "If the symptoms are severe, worsen over time, or are accompanied by any of the warning signs listed above, seek immediate medical attention.",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center"
    >
      <div className="mb-12 flex flex-col items-center">
        <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">Health Information</span>
        <div className="flex items-center gap-2 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 shadow-sm">
          <AlertCircle size={14} className="text-rose-500" />
          <span className="text-xs font-bold text-rose-600 tracking-wide">GENERAL INFORMATION — NOT A DIAGNOSIS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.1) }}
            className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-2xl ${section.bg} flex items-center justify-center`}>
                <section.icon size={20} className={section.color} />
              </div>
              <h3 className="text-sm font-bold tracking-wider text-engine-text uppercase">{section.title}</h3>
            </div>
            <p className="text-engine-muted leading-relaxed text-sm">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-engine-muted/60 max-w-xl text-center mt-4"
      >
        This system cannot diagnose conditions, prescribe medications, or replace professional medical advice.
      </motion.div>
    </motion.div>
  );
};