import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useCallback, useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import MapView, { MapPressEvent, Marker } from 'react-native-maps'
import IconButton from '../components/UI/IconButton'
import { RootStackParamList } from '../navigation/types'

export interface LocationType {
  latitude: number
  longitude: number
}

type MapProps = NativeStackScreenProps<RootStackParamList, 'Map'>

const Map = ({ navigation }: MapProps) => {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationType | null>()
  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectLocationHandler = (event: MapPressEvent) => {
    const latitude = event.nativeEvent.coordinate.latitude
    const longitude = event.nativeEvent.coordinate.longitude

    setSelectedLocation({ latitude, longitude })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked',
        'You have to pick a location (by tapping on the map) first!',
      )
      return
    }

    navigation.navigate('AddPlace', { pickedLocation: selectedLocation })
  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='save'
          size={24}
          color={tintColor!}
          onPress={savePickedLocationHandler}
        />
      ),
    })
  }, [navigation, savePickedLocationHandler])

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          title='Pick Locaiton'
        />
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})

export default Map
