import { motion } from 'framer-motion';
import { ANIMATION } from './constants';

interface StarProps {
  delay: number;
  position: {
    top: string;
    left?: string;
    right?: string;
  };
  type?: string;
  scale?: number;
  layer?: number;
}

export const Star = ({ 
  delay = 0, 
  position, 
  type = '✨', 
  scale = 1, 
  layer = 1 
}: StarProps) => (
  <motion.div
    className="absolute"
    style={{ 
      ...position, 
      fontSize: `${scale}rem`, 
      zIndex: layer 
    }}
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{
      duration: ANIMATION.star.duration,
      repeat: Infinity,
      delay,
    }}
  >
    {type}
  </motion.div>
);

export default Star; 