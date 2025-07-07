import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useUserStore from '../../store/useUserStore';

const AVATAR_OPTIONS = ['🐻‍❄️', '🦄', '🐙', '🐢', '🦩', '🦝', '🦋', '🦜', '🧑‍🎤', '🧑‍🚀', '🧑‍🎨', '🕺', '💃', '🏃‍♂️', '🏃‍♀️', '🩰', '🧞', '🧙‍♂️', '🧙‍♀️', '🧝‍♂️', '🧝‍♀️', '🧛‍♂️', '🧛‍♀️', '🦸‍♂️', '🦸‍♀️', '🧜‍♂️', '🧜‍♀️', '👼', '👸', '🤴', '🥷', '🤖', '🏴‍☠️', '🥝', '🔮', '🚀', '🧸', '🦠', '💎', '🧁', '🍩', '🍉'];

// Avatar categories for filtering
const CATEGORIES = {
  "All": AVATAR_OPTIONS,
  "Animals": ['🐻‍❄️', '🦄', '🐙', '🐢', '🦩', '🦝', '🦋', '🦜'],
  "People": ['🧑‍🎤', '🧑‍🚀', '🧑‍🎨', '🕺', '💃', '🏃‍♂️', '🏃‍♀️', '🩰'],
  "Fantasy": ['🧞', '🧙‍♂️', '🧙‍♀️', '🧝‍♂️', '🧝‍♀️', '🧛‍♂️', '🧛‍♀️', '🦸‍♂️', '🦸‍♀️', '🧜‍♂️', '🧜‍♀️', '👼', '👸', '🤴'],
  "Objects": ['🥷', '🤖', '🏴‍☠️', '🥝', '🔮', '🚀', '🧸', '🦠', '💎', '🧁', '🍩', '🍉']
};

// Avatar Selection Dialog component
const AvatarSelectionDialog = ({ 
  isOpen, 
  onClose, 
  selectedAvatar, 
  onSelectAvatar 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  selectedAvatar: string, 
  onSelectAvatar: (avatar: string) => void 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<keyof typeof CATEGORIES>("All");

  // Filter avatars based on search term and category
  const filteredAvatars = useMemo(() => {
    const categoryAvatars = CATEGORIES[activeCategory];
    if (!searchTerm) return categoryAvatars;
    
    // Simple filtering - in a real app you might want more sophisticated search
    return categoryAvatars.filter(avatar => 
      avatar.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeCategory]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center"
            onClick={onClose}
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1e1e2e] border-4 border-white rounded-xl shadow-lg p-6 max-w-md w-full max-h-[80vh] overflow-hidden pointer-events-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-['Press_Start_2P'] text-white">Choose Avatar</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white text-xl"
                >
                  ✕
                </motion.button>
              </div>
              
              {/* Search input */}
              <div className="mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search avatars..."
                  className="w-full bg-[#2a1d3e] border-2 border-white rounded-md px-3 py-2 text-white"
                />
              </div>
              
              {/* Category tabs */}
              <div className="flex overflow-x-auto mb-4 custom-scrollbar">
                {Object.keys(CATEGORIES).map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category as keyof typeof CATEGORIES)}
                    className={`px-3 py-1 whitespace-nowrap mr-2 rounded-md text-sm ${
                      activeCategory === category 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-[#2a1d3e] text-gray-300'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
              
              <div className="overflow-y-auto max-h-[40vh] pr-2 custom-scrollbar">
                {filteredAvatars.length > 0 ? (
                  <div className="grid grid-cols-5 gap-3">
                    {filteredAvatars.map((avatar) => (
                      <motion.button
                        key={avatar}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          onSelectAvatar(avatar);
                          onClose();
                        }}
                        className={`text-3xl h-16 flex items-center justify-center rounded-md ${
                          selectedAvatar === avatar 
                            ? 'bg-green-500 border-2 border-white' 
                            : 'bg-[#2a1d3e] border-2 border-[#2a1d3e]'
                        }`}
                      >
                        {avatar}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-400">
                    No avatars found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const UserInfoForm = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  
  const [username, setUsername] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [error, setError] = useState('');
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!age) {
      setError('Please enter your age');
      return;
    }
    
    if (!selectedAvatar) {
      setError('Please select an avatar');
      return;
    }
    
    setError('');
    setUserInfo(username, Number(age), selectedAvatar);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-[#1e1e2e] text-white border-4 border-white rounded-xl shadow-lg p-6 text-center">
        <motion.h2 
          className="text-xl font-['Press_Start_2P'] mb-6"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Create Your Profile
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm mb-4 font-mono"
            >
              {error}
            </motion.div>
          )}
          
          <div className="space-y-2">
            <label className="block text-sm font-mono text-left">Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#2a1d3e] border-2 border-white rounded-md px-3 py-2 text-white text-xl"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-mono text-left">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
              min="1"
              max="120"
              className="w-full bg-[#2a1d3e] border-2 border-white rounded-md px-3 py-2 text-white text-xl"
              placeholder="Enter your age"
              autoComplete="off"
            />
          </div>    
          
          <div className="space-y-2">
            <label className="block text-sm font-mono text-left mb-2">Avatar</label>
            <div className="flex gap-3">
              <div className="flex-1 bg-[#2a1d3e] border-2 border-white rounded-md h-16 flex items-center justify-center">
                {selectedAvatar ? (
                  <span className="text-4xl">{selectedAvatar}</span>
                ) : (
                  <span className="text-gray-400 font-mono">No avatar selected</span>
                )}
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAvatarDialogOpen(true)}
                className="bg-blue-500 text-white px-4 rounded-md border-2 border-white font-['Press_Start_2P'] text-xs flex items-center justify-center"
              >
                Choose
              </motion.button>
            </div>
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-green-500 text-black font-['Press_Start_2P'] text-sm py-3 rounded-md mt-6 border-2 border-black"
          >
            Continue
          </motion.button>
        </form>
      </div>
      
      {/* Avatar Selection Dialog */}
      <AvatarSelectionDialog
        isOpen={isAvatarDialogOpen}
        onClose={() => setIsAvatarDialogOpen(false)}
        selectedAvatar={selectedAvatar}
        onSelectAvatar={setSelectedAvatar}
      />
    </motion.div>
  );
};

export default UserInfoForm; 