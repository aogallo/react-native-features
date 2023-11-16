import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import PlaceForm from '../components/Places/PlaceForm'
import { RootStackParamList } from '../navigation/types'

export type AddPlacePropsType = NativeStackScreenProps<
  RootStackParamList,
  'AddPlace'
>

const AddPlace = ({ navigation }: AddPlacePropsType) => {
  function createPlaceHandler(place: Place) {
    navigation.navigate('AllPlaces', { place })
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlace
