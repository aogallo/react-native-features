import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Place } from '../models/place'
import { RootStackParamList } from '../navigation/types'
import { fetchPlaceDetails } from '../util/database'
import { Colors } from '../constants/colors'
import OutLinedButton from '../components/UI/OutLinedButton'

type PlaceDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PlaceDetails'
>

const PlaceDetails = ({ navigation, route }: PlaceDetailsScreenProps) => {
  const [fetchedPlace, setFetchedPlace] = useState<Place>()

  function showOnMapHandler() {
    navigation.navigate('Map', {
      longitude: fetchedPlace?.location.lng!,
      latitude: fetchedPlace?.location.lat!,
    })
  }

  const selectedPlaceId = route.params?.placeId

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId!)
      setFetchedPlace(place)
      navigation.setOptions({
        title: place.title,
      })
    }
    loadPlaceData()
  }, [selectedPlaceId])

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutLinedButton
          icon='map'
          text='View on Map'
          onPress={showOnMapHandler}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default PlaceDetails
