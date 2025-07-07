import { motion } from 'framer-motion';
import useUserStore from '../../store/useUserStore';
import UserInfoForm from './UserInfoForm';
import RoomCreationForm from './RoomCreationForm';
import { Cloud, Star, Moon, Character } from '../ui/landing';
import { cloudPositions, starPositions, characterPositions } from '../ui/landing/data';
import { BACKGROUND_GRADIENT } from '../ui/landing/constants';

const CreateRoomPage = () => {
  const hasCompletedProfile = useUserStore((state) => state.hasCompletedProfile());
  
  // Generate background elements
  const generateBackgroundElements = () => {
    const clouds: React.ReactNode[] = [];
    const stars: React.ReactNode[] = [];
    const characters: React.ReactNode[] = [];
    
    // Generate clouds
    cloudPositions.slice(0, 5).forEach((position, i) => {
      clouds.push(
        <Cloud 
          key={`cloud-${i}`}
          delay={i * 0.8}
          position={position}
          scale={0.8 + Math.random() * 0.8}
          opacity={0.5 + Math.random() * 0.3}
          emoji="☁️"
        />
      );
    });
    
    // Generate stars
    starPositions.slice(0, 10).forEach((pos, i) => {
      stars.push(
        <Star 
          key={`star-${i}`}
          delay={i * 0.3}
          position={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
          }}
          type="✨"
          scale={pos.scale}
          layer={pos.layer}
        />
      );
    });
    
    // Generate characters
    const emojis = ['🐰', '🤖', '🐱', '🧑‍🚀', '🐻', '🦊', '🐧'];
    characterPositions.slice(0, 4).forEach((position, i) => {
      if (i < emojis.length) {
        characters.push(
          <Character 
            key={`character-${i}`}
            emoji={emojis[i]}
            position={position}
            animationDelay={i * 0.4}
            scale={2 + Math.random()}
          />
        );
      }
    });
    
    return { clouds, stars, characters };
  };
  
  const { clouds, stars, characters } = generateBackgroundElements();

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12"
      style={{ 
        background: `linear-gradient(to bottom, ${BACKGROUND_GRADIENT.from}, ${BACKGROUND_GRADIENT.to})` 
      }}
    >
      {/* Background elements */}
      {stars}
      {clouds}
      <Moon />
      {characters}
      
      {/* Main content */}
      <div className="relative z-20 w-full">
        {hasCompletedProfile ? <RoomCreationForm /> : <UserInfoForm />}
      </div>
      
      {/* Back button */}
      <motion.a
        href="/"
        className="absolute top-4 left-4 bg-[#1e1e2e] text-white px-4 py-2 rounded-md border-2 border-white font-['Press_Start_2P'] text-xs flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.a>
    </div>
  );
};

export default CreateRoomPage; 