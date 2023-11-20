import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import IconButton from './components/UI/IconButton'
import { Colors } from './constants/colors'
import { RootStackParamList } from './navigation/types'
import AddPlace from './screens/AddPlace'
import AllPlaces from './screens/AllPlaces'
import Map from './screens/Map'
import { init } from './util/database'
import PlaceDetails from './screens/PlaceDetails'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false)
  useEffect(() => {
    init()
      .then(() => setDbInitialized(true))
      .catch((error) => console.log(error))
  }, [])

  if (!dbInitialized) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
            headerBackTitle: 'Back',
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon='add'
                  size={24}
                  color={tintColor!}
                  onPress={() => {
                    console.log('add')
                    navigation.navigate('AddPlace')
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{ title: 'Add a new Place' }}
          />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen
            name='PlaceDetails'
            component={PlaceDetails}
            options={{ title: 'Loading Place...' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
