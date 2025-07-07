import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CARD_STYLES, BUTTON_COLORS } from './constants';

export const MainCard = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="relative z-20 text-white border-4 rounded-xl shadow-lg px-4 sm:px-6 py-6 sm:py-8 max-w-sm mx-auto text-center w-full"
      style={{ 
        backgroundColor: CARD_STYLES.background,
        borderColor: CARD_STYLES.borderColor
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-xl sm:text-2xl text-white mb-3 sm:mb-4 font-['Press_Start_2P']"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Welcome to Gatherverse
      </motion.h1>
      
      <motion.div 
        className="text-4xl sm:text-5xl my-4 sm:my-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {'👾'}
      </motion.div>
      
      <p className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 font-mono">
        2D multiplayer chat with P2P video.
      </p>
      
      <div className="flex flex-col gap-3 sm:gap-4">
        <motion.button 
          className={`${BUTTON_COLORS.create.background} border-3 sm:border-4 ${BUTTON_COLORS.create.border} ${BUTTON_COLORS.create.text} py-1.5 sm:py-2 px-3 sm:px-4 rounded-md font-['Press_Start_2P'] text-xs sm:text-sm flex items-center justify-center gap-2`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/create')}
        >
          <span>🎮 Create a Room</span>
          <motion.span 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            ✨
          </motion.span>
        </motion.button>
        
        <motion.button 
          className={`${BUTTON_COLORS.join.background} border-3 sm:border-4 ${BUTTON_COLORS.join.border} ${BUTTON_COLORS.join.text} py-1.5 sm:py-2 px-3 sm:px-4 rounded-md font-['Press_Start_2P'] text-xs sm:text-sm flex items-center justify-center gap-2`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/join')}
        >
          <span>🧿 Join a Room</span>
          <motion.span 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            ✨
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MainCard; 