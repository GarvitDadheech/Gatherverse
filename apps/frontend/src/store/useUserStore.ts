import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  username: string;
  age: number | null;
  avatarEmoji: string;
  setUserInfo: (username: string, age: number, avatarEmoji: string) => void;
  clearUserInfo: () => void;
  hasCompletedProfile: () => boolean;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      username: '',
      age: null,
      avatarEmoji: '',
      
      setUserInfo: (username: string, age: number, avatarEmoji: string) => 
        set({ username, age, avatarEmoji }),
      
      clearUserInfo: () => 
        set({ username: '', age: null, avatarEmoji: '' }),
      
      hasCompletedProfile: () => {
        const { username, age, avatarEmoji } = get();
        return !!username && !!age && !!avatarEmoji;
      }
    }),
    {
      name: 'gatherverse-user', // localStorage key
    }
  )
);

export default useUserStore; 