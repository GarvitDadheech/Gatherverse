import { create } from 'zustand';

interface RoomState {
  name: string;
  description: string;
  imageUrl: string;
  setRoomInfo: (name: string, description: string, imageUrl: string) => void;
  clearRoomInfo: () => void;
}

const useRoomStore = create<RoomState>((set) => ({
  name: '',
  description: '',
  imageUrl: '',
  
  setRoomInfo: (name: string, description: string, imageUrl: string) => 
    set({ name, description, imageUrl }),
  
  clearRoomInfo: () => 
    set({ name: '', description: '', imageUrl: '' }),
}));

export default useRoomStore; 