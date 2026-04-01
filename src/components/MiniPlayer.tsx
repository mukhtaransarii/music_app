import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { usePlayerStore } from '../store/playerStore'
import { togglePlay } from '../player/audio'

export default function MiniPlayer() {
  const { currentSong, isPlaying } = usePlayerStore()
  const navigation = useNavigation()

  if (!currentSong) return null

  return (
    // ✅ Tap row → open full player
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Player' as never)}
      className="bg-white border-t border-gray-200 px-3 py-2 flex-row items-center"
    >
      <Image
        source={{ uri: currentSong.image }}
        className="w-12 h-12 rounded-lg bg-gray-100"
      />

      <View className="ml-3 flex-1">
        <Text className="text-gray-900 font-semibold" numberOfLines={1}>
          {currentSong.title}
        </Text>
        <Text className="text-gray-500 text-xs" numberOfLines={1}>
          {currentSong.artist}
        </Text>
      </View>

      {/* ✅ stopPropagation so play/pause doesn't also navigate */}
      <TouchableOpacity
        onPress={(e) => { e.stopPropagation(); togglePlay() }}
        className="w-7 h-7 rounded-full bg-[#F09046] items-center justify-center"
      >
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={14} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}