import { motion } from 'framer-motion';
import { ANIMATION } from './constants';

export const Moon = () => (
  <motion.div
    className="absolute top-10 right-[10%] z-5"
    animate={{ y: [-5, 5, -5] }}
    transition={{
      duration: ANIMATION.moon.duration,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <div className="relative">
      <div className="absolute inset-0 text-6xl sm:text-7xl blur-md opacity-40 text-yellow-100">🌕</div>
      <div className="absolute inset-0 text-6xl sm:text-7xl blur-sm opacity-60 text-yellow-100">🌕</div>
      <div className="text-6xl sm:text-7xl relative z-10">🌕</div>
    </div>
  </motion.div>
);

export default Moon; 