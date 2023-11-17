import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import PlaceForm from '../components/Places/PlaceForm'
import { RootStackParamList } from '../navigation/types'
import { insertPlace } from '../util/database'
import Button from '../components/UI/Button'

export type AddPlacePropsType = NativeStackScreenProps<
  RootStackParamList,
  'AddPlace'
>

const AddPlace = ({ navigation }: AddPlacePropsType) => {
  async function createPlaceHandler(place: Place) {
    await insertPlace(place)
    navigation.navigate('AllPlaces', { place })
  }

  const addManual = async () => {
    await insertPlace({
      id: '1',
      address: '2050 Buchanan St',
      title: 'Test',
      location: { lat: 37.8, lng: -122 },
      imageUri: 'https://reactnative.dev/img/tiny_logo.png',
    })
  }

  return (
    <>
      <Button text='add manual' onPress={addManual} />
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </>
  )
}

export default AddPlace
