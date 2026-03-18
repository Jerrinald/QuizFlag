import { create } from 'zustand';

const useQuizStore = create((set) => ({
  duration: 60,
  setDuration: (value) => set({ duration: value }),
}));

export default useQuizStore;
