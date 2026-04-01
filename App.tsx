import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Home from './src/screen/Home'
import SearchSong from './src/screen/SearchSong'
import Player from './src/screen/Player'
import MiniPlayer from './src/components/MiniPlayer'
import BottomNav from './src/components/BottomNav'

const Stack = createNativeStackNavigator()

export default function App() {


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <NavigationContainer>

          {/* ✅ Stack takes all remaining space */}
          <View style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="SearchSong" component={SearchSong} />
              <Stack.Screen name="Player" component={Player} />
            </Stack.Navigator>
          </View>

          <MiniPlayer />
          <BottomNav />

        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}