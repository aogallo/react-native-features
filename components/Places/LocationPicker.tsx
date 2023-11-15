import { Alert, StyleSheet, Text, View } from 'react-native'
import OutLinedButton from '../UI/OutLinedButton'
import { Colors } from '../../constants/colors'
import {
  PermissionStatus,
  getCurrentPositionAsync,
  LocationObject,
  useForegroundPermissions,
} from 'expo-location'
import { useState } from 'react'
import MapView from 'react-native-maps'

const LocationPicker = () => {
  const [CurrentLocation, setCurrentLocation] = useState<LocationObject | null>(
    null,
  )
  const [locationStatus, requestPermission] = useForegroundPermissions()

  const verifyPermissions = async () => {
    if (locationStatus?.status === PermissionStatus.UNDETERMINED) {
      const permissions = await requestPermission()
      return permissions.granted
    }

    if (locationStatus?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this feature',
      )
      return
    }

    return true
  }

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions()
    if (!hasPermissions) {
      return
    }

    const locationResult = await getCurrentPositionAsync()

    console.log(locationResult)

    setCurrentLocation(locationResult)
  }

  const pickOnMapHandler = () => {}

  return (
    <View>
      <View style={styles.mapPreview}>
        {CurrentLocation ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: CurrentLocation.coords.latitude,
              longitude: CurrentLocation.coords.longitude,
              latitudeDelta: 0, //CurrentLocation.coords.latitude,
              longitudeDelta: 0, //CurrentLocation.coords.longitude,
            }}
          />
        ) : (
          <Text>No location taken yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutLinedButton
          text='Locate User'
          icon='location'
          onPress={getLocationHandler}
        />
        <OutLinedButton
          text='Pick on Map'
          icon='map'
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default LocationPicker
