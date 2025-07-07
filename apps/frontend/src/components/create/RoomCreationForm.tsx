import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useRoomStore from '../../store/useRoomStore';
import useUserStore from '../../store/useUserStore';

const RoomCreationForm = () => {
  const { username, avatarEmoji } = useUserStore();
  const setRoomInfo = useRoomStore((state) => state.setRoomInfo);
  
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
    setImageLoadError(false);
    setIsLoading(!!url);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageLoadError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageLoadError(true);
    setError('Unable to load image. Please try another URL or upload an image.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }

    setIsLoading(true);
    setImageLoadError(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageUrl(result);
      setIsLoading(false);
      setError('');
    };
    reader.onerror = () => {
      setError('Error reading file');
      setIsLoading(false);
      setImageLoadError(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomName.trim()) {
      setError('Please enter a room name');
      return;
    }
    
    if (!description.trim()) {
      setError('Please enter a room description');
      return;
    }
    
    if (!imageUrl || imageLoadError) {
      setError('Please add a valid room image');
      return;
    }
    
    setError('');
    setRoomInfo(roomName, description, imageUrl);
    console.log('Room created:', { roomName, description, image: imageUrl });
    // Here you would typically navigate to the room or show a success message
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-[#1e1e2e] text-white border-4 border-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            className="text-2xl"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {avatarEmoji}
          </motion.div>
          <div>
            <h2 className="text-xl font-['Press_Start_2P']">Create Room</h2>
            <p className="text-sm text-gray-300 font-mono">Hey, {username}!</p>
          </div>
        </div>
        
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
            <label className="block text-sm font-mono text-left">Room Name</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full bg-[#2a1d3e] border-2 border-white rounded-md px-3 py-2 text-white text-xl"
              placeholder="Enter room name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-mono text-left">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-[#2a1d3e] border-2 border-white rounded-md px-3 py-2 text-white resize-none text-xl"
              placeholder="Describe your room"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-mono text-left mb-2">Room Image</label>
            
            <div className="flex gap-2 mb-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 bg-[#2a1d3e] border-2 border-white rounded-md py-2 text-md"
              >
                Upload Image
              </motion.button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              
              <p className="flex items-center text-gray-300 font-mono">or</p>
              
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                className="flex-1 bg-[#2a1d3e] border-2 border-white rounded-md px-3 py-2 text-white text-md"
                placeholder="Paste image URL"
              />
            </div>
            
            <div className="relative h-40 bg-[#2a1d3e] border-2 border-white rounded-md overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-300 font-mono">Loading...</p>
                </div>
              )}
              
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Room preview"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                  style={{ 
                    display: isLoading ? 'none' : 'block'
                  }}
                />
              )}
              
              {!imageUrl && !isLoading && (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400 font-mono">Preview</p>
                </div>
              )}
              
              {imageUrl && !isLoading && !imageLoadError && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setImageUrl('');
                    setImageLoadError(false);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ✕
                </motion.button>
              )}
            </div>
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-green-500 text-black font-['Press_Start_2P'] text-sm py-3 rounded-md mt-6 border-2 border-black"
          >
            Create Room ✨
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default RoomCreationForm; 