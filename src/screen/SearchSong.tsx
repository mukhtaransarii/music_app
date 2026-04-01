import { useRoute } from '@react-navigation/native'
import { View, Text, FlatList, Image, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { searchSong } from '../api/api'
import { Song } from '../types/song'
import { usePlayerStore } from '../store/playerStore'
import { playSong } from '../player/audio'

export default function SearchSong() {
  const route = useRoute<any>()
  const initialQuery = route.params?.initialQuery ?? ''

  const [songs, setSongs] = useState<Song[]>([])
  const [query, setQuery] = useState(initialQuery)
  const [loading, setLoading] = useState(false)

  // Pagination states
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const { currentSong, isPlaying } = usePlayerStore()

  // ✅ Track current query to reset on new search
  const activeQuery = useRef(query)

  const loadSongs = async (q: string) => {
    if (!q.trim()) return
    activeQuery.current = q
    setLoading(true)
    setPage(1)
    const { songs: results, total } = await searchSong(q, 1)
    setSongs(results)
    setTotal(total)
    setLoading(false)
  }

  const loadMore = async () => {
    if (loadingMore || songs.length >= total) return
    setLoadingMore(true)
    const nextPage = page + 1
    const { songs: more } = await searchSong(activeQuery.current, nextPage)
    setSongs((prev) => [...prev, ...more])  // ✅ append
    setPage(nextPage)
    setLoadingMore(false)
  }

  useEffect(() => { loadSongs(query) }, [])

  return (
    <View className="flex-1 bg-white p-4">

      <Text className="text-gray-900 text-2xl font-bold mb-6 tracking-tight">Search Songs</Text>

      <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 mb-2 border border-gray-200">
        <Ionicons name="search" size={18} color="#aaa" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => loadSongs(query)}
          placeholder="Artist, song, album..."
          placeholderTextColor="#aaa"
          returnKeyType="search"
          className="flex-1 text-gray-900 py-3.5 px-3 text-base"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {loading && <ActivityIndicator color="#F09046" size="small" className="my-4" />}

      {!loading && songs.length === 0 && (
        <View className="items-center mt-16">
          <Ionicons name="musical-notes-outline" size={40} color="#ccc" />
          <Text className="text-gray-400 mt-3 text-sm">No songs found</Text>
        </View>
      )}

      <FlatList
        data={songs}
        keyExtractor={(item, index) => item.id ? item.id : index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        onEndReached={loadMore}           // ✅ triggers near bottom
        onEndReachedThreshold={0.4}       // ✅ 40% from bottom
        ListFooterComponent={
          loadingMore ? <ActivityIndicator color="#F09046" size="small" className="my-4" /> : null
        }
        renderItem={({ item }) => {
          const isActive = currentSong?.id === item.id

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => playSong(item)}
              className="flex-row items-center py-3.5 border-b border-gray-100"
            >
              <Image
                source={{ uri: item.image }}
                className="w-16 h-16 rounded-xl bg-gray-100"
              />

              <View className="ml-3.5 flex-1 gap-2">
                <Text
                  className={`font-semibold text-[15px] ${isActive ? 'text-[#F09046]' : 'text-gray-900'}`}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text className="text-gray-400 text-sm" numberOfLines={1}>
                  {item.artist} • {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => playSong(item)}
                className="w-7 h-7 rounded-full bg-[#F09046] flex items-center justify-center"
              >
                <Ionicons
                  name={isActive && isPlaying ? 'pause' : 'play'}
                  size={14}
                  color="#fff"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}