import { motion } from 'framer-motion';

export const ReflectiveResult = ({ data }: { data?: any }) => {
  // Fallback to the mockup if no data is passed yet
  const content = data || {
    title: "Career Transition Trade-offs",
    description: "No dynamic data received from the backend.",
    dataPoints: ["Financial impact", "Lifestyle changes", "Long-term goals"]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center"
    >
      <div className="mb-10 flex flex-col items-center">
        <span className="text-xs font-bold tracking-widest text-engine-indigo uppercase mb-2">Reflective Analysis</span>
      </div>

      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl md:text-5xl font-bold text-engine-text mb-8 text-center max-w-3xl"
      >
        {content.title}
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white/70 backdrop-blur-md border border-white p-8 rounded-3xl shadow-sm mb-12 text-center"
      >
        <p className="text-lg text-engine-text leading-relaxed">
          {content.description}
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
        {content.dataPoints?.map((tag: string, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="px-6 py-2 bg-white/50 border border-white rounded-full shadow-sm text-sm text-engine-muted"
          >
            {tag}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};