import { motion } from 'framer-motion';
import { ANIMATION } from './constants';

interface CharacterProps {
  emoji: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  animationDelay: number;
  scale?: number;
}

export const Character = ({ 
  emoji, 
  position, 
  animationDelay = 0, 
  scale = 1 
}: CharacterProps) => (
  <motion.div
    className="absolute z-10"
    style={{ ...position, fontSize: `${scale}rem` }}
    animate={{ y: [0, -8, 0] }}
    transition={{
      duration: ANIMATION.character.duration,
      repeat: Infinity,
      delay: animationDelay,
    }}
  >
    {emoji}
  </motion.div>
);

export default Character; 