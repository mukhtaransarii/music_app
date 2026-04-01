export interface Song {
  id: string
  title: string
  artist: string
  image: string
  audio: string
  duration: number
}

export interface PlayerStore {
  currentSong: any
  isPlaying: boolean
  setCurrentSong: (song: any) => void
  setPlaying: (val: boolean) => void
}
