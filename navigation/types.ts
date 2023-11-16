import { LocationType } from '../screens/Map'

export type RootStackParamList = {
  AllPlaces: { place: Place } | undefined
  AddPlace: { pickedLocation: LocationType } | undefined
  Map: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
