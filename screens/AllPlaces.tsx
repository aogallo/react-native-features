import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import PlacesList from '../components/Places/PlacesList'
import { RootStackParamList } from '../navigation/types'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'

export type AllPlacesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AllPlaces'
>

const AllPlaces = ({ route }: AllPlacesScreenProps) => {
  const [places, setPlaces] = useState<Place[]>([])
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused && route.params) {
      setPlaces((currentPlaces) => [...currentPlaces, route.params?.place!])
    }
  }, [isFocused, route])

  return <PlacesList places={places} />
}

export default AllPlaces
