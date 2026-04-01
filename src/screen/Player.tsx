import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { usePlayerStore } from '../store/playerStore'
import { togglePlay } from '../player/audio'
import { useAudioPlayerStatus } from 'expo-audio'
import { player } from '../player/audio'
import Slider from '@react-native-community/slider'

const { width } = Dimensions.get('window')

export default function Player() {
  const navigation = useNavigation()
  const { currentSong, isPlaying } = usePlayerStore()
  const status = useAudioPlayerStatus(player!)

  const currentTime = status?.currentTime ?? 0
  const duration = status?.duration ?? 1

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  if (!currentSong) return null

  return (
    <View className="flex-1 bg-white px-6 pt-4">

      {/* Header */}
      <View className="flex-row items-center justify-between mb-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down" size={28} color="#111" />
        </TouchableOpacity>
        <Text className="text-gray-900 font-semibold text-base">Now Playing</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#111" />
        </TouchableOpacity>
      </View>

      {/* Album Art */}
      <Image
        source={{ uri: currentSong.image }}
        style={{ width: width - 48, height: width - 48 }}
        className="rounded-3xl bg-gray-100 self-center mb-10"
      />

      {/* Song Info */}
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-1 mr-4">
          <Text className="text-gray-900 text-xl font-bold" numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text className="text-gray-400 mt-1" numberOfLines={1}>
            {currentSong.artist}
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#F09046" />
        </TouchableOpacity>
      </View>

      {/* Seek Bar */}
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        onSlidingComplete={(val) => player?.seekTo(val)}
        minimumTrackTintColor="#F09046"
        maximumTrackTintColor="#E5E7EB"
        thumbTintColor="#F09046"
      />

      {/* Time */}
      <View className="flex-row justify-between -mt-2 mb-8">
        <Text className="text-gray-400 text-xs">{formatTime(currentTime)}</Text>
        <Text className="text-gray-400 text-xs">{formatTime(duration)}</Text>
      </View>

      {/* Controls */}
      <View className="flex-row items-center justify-between px-4">

        <TouchableOpacity>
          <Ionicons name="shuffle" size={22} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={28} color="#111" />
        </TouchableOpacity>

        {/* Play / Pause */}
        <TouchableOpacity
          onPress={togglePlay}
          className="w-16 h-16 rounded-full bg-[#F09046] items-center justify-center"
          style={{ elevation: 6, shadowColor: '#F09046', shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={28} color="#111" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="repeat" size={22} color="#ccc" />
        </TouchableOpacity>

      </View>
    </View>
  )
}