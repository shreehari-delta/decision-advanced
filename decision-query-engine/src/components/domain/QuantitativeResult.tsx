import { motion } from 'framer-motion';

export const QuantitativeResult = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center"
    >
      <div className="mb-8 flex flex-col items-center">
        <span className="text-xs font-bold tracking-widest text-engine-indigo uppercase mb-2">Quantitative</span>
        <span className="text-sm text-engine-muted bg-engine-sky/30 px-3 py-1 rounded-full">Exact calculation</span>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="text-4xl md:text-6xl font-bold text-red-500/90 mb-12 tracking-tight"
      >
        NOT POSSIBLE
      </motion.div>

      <div className="w-full max-w-md grid grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col items-center">
          <span className="text-xs text-engine-muted mb-2 tracking-wider">AVAILABLE</span>
          <span className="text-2xl font-medium text-engine-text">68 min</span>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-engine-indigo/20 mt-4 rounded-full" 
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-engine-muted mb-2 tracking-wider">REQUIRED</span>
          <span className="text-2xl font-medium text-engine-text">120 min</span>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-red-400 mt-4 rounded-full" 
          />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm w-full max-w-md text-center"
      >
        <p className="text-sm text-engine-muted mb-4 font-mono tracking-wide">TIME = DISTANCE ÷ SPEED</p>
        <div className="flex flex-col space-y-2 font-medium text-engine-text text-lg">
          <span>10 ÷ 5 = 2 hours</span>
          <span>2 × 60 = 120 minutes</span>
        </div>
        
        <div className="mt-6 pt-4 border-t border-engine-sky/50">
          <p className="text-sm text-engine-muted mb-1">To complete it in 68 minutes:</p>
          <p className="text-xl font-bold text-engine-indigo">8.82 km/h</p>
        </div>
      </motion.div>
    </motion.div>
  );
};