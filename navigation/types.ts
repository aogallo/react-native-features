import { Place } from '../models/place'
import { LocationType } from '../screens/Map'

export type RootStackParamList = {
  AllPlaces: { place: Place } | undefined
  AddPlace: { pickedLocation: LocationType } | undefined
  Map: { latitude: number; longitude: number } | undefined
  PlaceDetails: { placeId: string } | undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
