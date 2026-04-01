import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { searchArtists } from '../api/api'

const FEATURED = ['Ariana','Sia','Dua Lipa','Billie Ellish','Arijit Singh', 'Shreya Ghoshal', 'Jubin Nautiyal', 'Neha Kakkar', 'badshah']

type Artist = { id: string; name: string; image: string }

export default function Home() {
  const navigation = useNavigation<any>()
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const results = await Promise.all(FEATURED.map((q) => searchArtists(q)))
      const list = results.map((r) => r[0]).filter(Boolean)
      setArtists(list)
      setLoading(false)
    }
    load()
  }, [])

  const onArtistPress = (name: string) => {
    navigation.navigate('SearchSong', { initialQuery: name })
  }

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      <View className="p-4">
        <Text className="text-gray-900 text-2xl font-bold mb-6 tracking-tight">BBS Music App</Text>

        <TouchableOpacity 
          onPress={() => navigation.navigate('SearchSong')}
          className="flex-row items-center bg-gray-50 rounded-2xl px-4 mb-2 border border-gray-200"
        >
          <Ionicons name="search" size={18} color="#aaa" />
          
          <Text className="flex-1 text-gray-400 py-3.5 px-3 text-base">
            Artist, song, album...
          </Text>
        </TouchableOpacity>

        {/* Artists Section */}
        <View className="mt-8">
          <Text className="text-gray-900 text-lg font-bold mb-4">Artists</Text>

          {loading ? (
            <ActivityIndicator color="#F09046" />
          ) : (
            <FlatList
              data={artists}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 12 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => onArtistPress(item.name)}
                  className="items-center"
                  style={{ width: 100 }}
                >
                  <Image
                    source={{ uri: item.image }}
                    className="w-28 h-28 rounded-full bg-gray-100"
                  />
                  <Text className="text-gray-800 text-xs font-medium mt-2 text-center" numberOfLines={2}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

      </View>
    </ScrollView>
  )
}