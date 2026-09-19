import { motion } from 'framer-motion';

interface ReasoningOrbProps {
  state: 'idle' | 'understanding' | 'clarifying' | 'calculating' | 'complete';
}

export const ReasoningOrb = ({ state }: ReasoningOrbProps) => {
  const getDuration = () => {
    if (state === 'understanding' || state === 'calculating') return 2;
    if (state === 'complete') return 6;
    return 4;
  };

  return (
    <div className="relative w-28 h-28 flex items-center justify-center filter drop-shadow-[0_18px_30px_rgba(0,50,110,0.3)]">
      
      {/* 1. ORGANIC ASYMMETRICAL WATER DROPLET BODY */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [-2, 2, -2]
        }}
        transition={{
          duration: getDuration(),
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-full h-full relative"
        style={{
          // Custom organic border radius creating an asymmetrical, natural water bead shape
          borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
          
          // Deep crystal-clear water refraction gradient
          background: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.95) 0%, rgba(150,220,255,0.65) 30%, rgba(20,110,205,0.85) 70%, rgba(3,40,95,0.95) 100%)',
          
          // Layered glass border shadows and 3D volumetric refraction
          boxShadow: `
            inset 10px 14px 22px rgba(255, 255, 255, 0.95),
            inset -12px -16px 28px rgba(0, 30, 95, 0.8),
            inset 0px -20px 35px rgba(10, 90, 200, 0.6),
            0 0 0 1.5px rgba(255, 255, 255, 0.6)
          `,
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* 2. TOP GLASS REFLECTION ARC */}
        <div 
          className="absolute top-[12%] left-[18%] w-[45%] h-[28%] rounded-[50%] bg-gradient-to-br from-white via-white/80 to-transparent opacity-90 blur-[0.4px] transform -rotate-[25deg] pointer-events-none"
        />

        {/* 3. LOWER CAUSTIC GLOW */}
        <div 
          className="absolute bottom-[12%] right-[15%] w-[40%] h-[20%] rounded-[50%] bg-cyan-200/40 blur-[4px] transform rotate-[15deg] pointer-events-none"
        />
      </motion.div>

      {/* 4. SCATTERED MICRO-DROPLETS (Matching reference layout) */}
      <motion.div 
        animate={{ y: [-3, 3, -3], opacity: [0.7, 1, 0.7] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
        className="absolute w-3.5 h-3.5 top-1 -right-3 rounded-full bg-white/70 backdrop-blur-sm shadow-[inset_1px_1px_3px_rgba(255,255,255,0.9)]" 
      />
      
      <motion.div 
        animate={{ y: [4, -4, 4], opacity: [0.6, 0.9, 0.6] }} 
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} 
        className="absolute w-2.5 h-2.5 top-8 -left-3.5 rounded-full bg-white/60 backdrop-blur-sm shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9)]" 
      />

      <motion.div 
        animate={{ y: [-2, 2, -2], opacity: [0.5, 0.8, 0.5] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
        className="absolute w-2 h-2 bottom-6 -left-2 rounded-full bg-white/50 backdrop-blur-sm shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9)]" 
      />
    </div>
  );
};