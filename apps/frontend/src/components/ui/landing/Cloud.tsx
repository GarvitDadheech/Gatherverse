import { motion } from 'framer-motion';
import { ANIMATION } from './constants';

interface CloudProps {
  delay: number;
  position: {
    top: string;
    left?: string;
    right?: string;
  };
  scale?: number;
  opacity?: number;
  emoji?: string;
}

export const Cloud = ({ 
  delay = 0, 
  position, 
  scale = 1, 
  opacity = 1, 
  emoji = '☁️' 
}: CloudProps) => (
  <motion.div
    className="absolute z-0"
    style={{ ...position, fontSize: `${scale * 4}rem`, opacity }}
    animate={{ x: [-20, 20] }}
    transition={{
      duration: ANIMATION.cloud.duration,
      repeat: Infinity,
      repeatType: "reverse",
      delay,
    }}
  >
    {emoji}
  </motion.div>
);

export default Cloud; 