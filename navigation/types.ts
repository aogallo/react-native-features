export type RootStackParamList = {
  AllPlaces: undefined
  AddPlace: undefined
  Map: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
