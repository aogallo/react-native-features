import type { RouteProp } from '@react-navigation/native'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location'
import { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { getAddress, getMapPreview } from '../../util/location'
import OutLinedButton from '../UI/OutLinedButton'
import { RootStackParamList } from '../../navigation/types'
import { LocationType } from '../../screens/Map'
import { PickedLocationType } from './PlaceForm'

type AddPlaceScreenRouteProp = RouteProp<RootStackParamList, 'AddPlace'>

interface LocationPickerProps {
  onPickImage(location: PickedLocationType): void
}
const LocationPicker = ({ onPickImage }: LocationPickerProps) => {
  const navigation = useNavigation()
  const route = useRoute<AddPlaceScreenRouteProp>()
  const isFocused = useIsFocused()
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(
    null,
  )
  const [locationStatus, requestPermission] = useForegroundPermissions()

  useEffect(() => {
    if (isFocused && route.params) {
      setCurrentLocation({
        latitude: route.params.pickedLocation.latitude,
        longitude: route.params.pickedLocation.longitude,
      })
    }
  }, [route, isFocused])

  useEffect(() => {
    async function handleLocation() {
      if (currentLocation) {
        const address = await getAddress(
          currentLocation.latitude,
          currentLocation.longitude,
        )

        onPickImage({ ...currentLocation, address })
      }
    }

    handleLocation()
  }, [currentLocation, onPickImage])

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

    setCurrentLocation({
      latitude: locationResult.coords.latitude,
      longitude: locationResult.coords.longitude,
    })
  }

  const pickOnMapHandler = () => {
    navigation.navigate('Map')
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {currentLocation ? (
          <Image
            style={styles.map}
            source={{
              uri: getMapPreview(
                currentLocation?.latitude,
                currentLocation?.longitude,
              ),
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
    overflow: 'hidden',
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
