import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

type Tab = 'home' | 'fav' | 'playlist' | 'setting'

const TABS: { key: Tab; label: string; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'home',     label: 'Home',     icon: 'home-outline',           activeIcon: 'home' },
  { key: 'fav',      label: 'Favourites', icon: 'heart-outline',        activeIcon: 'heart' },
  { key: 'playlist', label: 'Playlist', icon: 'musical-notes-outline',  activeIcon: 'musical-notes' },
  { key: 'setting',  label: 'Settings', icon: 'settings-outline',       activeIcon: 'settings' },
]

export default function BottomNav() {
  const [active, setActive] = useState<Tab>('home')
  const navigation = useNavigation()

  return (
    <View className="flex-row bg-white border-t border-gray-100 px-2 pb-6 pt-3">
      {TABS.map((tab) => {
        const isActive = active === tab.key
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => {
              setActive(tab.key)
              if(tab.label === 'Home') navigation.navigate(tab.label as never)
            }}
            activeOpacity={0.7}
            className="flex-1 items-center gap-1"
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={22}
              color={isActive ? '#F09046' : '#aaa'}
            />
            <Text
              className={`text-[11px] font-medium ${isActive ? 'text-[#F09046]' : 'text-gray-400'}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}