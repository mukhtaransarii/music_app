import { AudioPlayer, createAudioPlayer } from 'expo-audio'
import { usePlayerStore } from '../store/playerStore'
import { Song } from '../types/song'

export let player: AudioPlayer | null = null

export async function playSong(song: Song) {
  const { setCurrentSong, setPlaying } = usePlayerStore.getState()

  if (player) {
    player.pause()
    player.remove()
  }

  player = createAudioPlayer({ uri: song.audio })
  setCurrentSong(song)
  setPlaying(true)
  player.play()

  player.addListener('playbackStatusUpdate', (status) => {
    if (status.didJustFinish) setPlaying(false)
  })
}

export function togglePlay() {
  const { isPlaying, setPlaying } = usePlayerStore.getState()
  if (!player) return
  if (isPlaying) {
    player.pause()
    setPlaying(false)
  } else {
    player.play()
    setPlaying(true)
  }
}