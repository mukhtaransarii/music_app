import { create } from 'zustand'
import { PlayerStore } from '../types/song'

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentSong: null,
  isPlaying: false,

  setCurrentSong: (song) => set({ currentSong: song }),
  setPlaying: (val) => set({ isPlaying: val }),
}))
