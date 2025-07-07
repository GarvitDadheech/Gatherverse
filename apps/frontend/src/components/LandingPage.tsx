import { 
  Cloud, 
  Star, 
  Character, 
  Moon, 
  MainCard,
  cloudPositions, 
  starPositions, 
  characterEmojis, 
  characterPositions,
  BACKGROUND_GRADIENT
} from './ui/landing';

const LandingPage = () => {
  const generateElements = () => {
    const clouds: React.ReactNode[] = [];
    const stars: React.ReactNode[] = [];
    const characters: React.ReactNode[] = [];
    
    // Generate clouds
    cloudPositions.forEach((position, i) => {
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
    starPositions.forEach((pos, i) => {
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
          scale={pos.scale * 1.5}
          layer={pos.layer}
        />
      );
    });
    
    // Generate characters
    characterPositions.forEach((position, i) => {
      if (i < characterEmojis.length) {
        characters.push(
          <Character 
            key={`character-${i}`}
            emoji={characterEmojis[i]}
            position={position}
            animationDelay={i * 0.4}
            scale={2 + Math.random()}
          />
        );
      }
    });
    
    return { clouds, stars, characters };
  };
  
  const { clouds, stars, characters } = generateElements();
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-6"
      style={{ 
        background: `linear-gradient(to bottom, ${BACKGROUND_GRADIENT.from}, ${BACKGROUND_GRADIENT.to})` 
      }}
    >
      {stars}
      {clouds}
      <Moon />
      {characters}
      <MainCard />
    </div>
  );
};

export default LandingPage; 