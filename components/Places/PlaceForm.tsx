import { useCallback, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import { Colors } from '../../constants/colors'
import ImagePicket from './ImagePicket'
import LocationPicker from './LocationPicker'
import Button from '../UI/Button'

export interface PickedLocationType {
  latitude?: number
  longitude?: number
  address?: string
}

interface PlaceFormProps {
  onCreatePlace(place: Place): void
}

const PlaceForm = ({ onCreatePlace }: PlaceFormProps) => {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [pickedLocation, setPickedLocation] = useState<PickedLocationType>()
  const [selectedImage, setSelectedImage] = useState('')

  const changeTitleHandler = (text: string) => {
    setEnteredTitle(text)
  }

  const savePlaceHandler = () => {
    console.log(enteredTitle)
    console.log(selectedImage)
    console.log(pickedLocation)
    const place = new Place(
      enteredTitle,
      selectedImage,
      pickedLocation?.address!,
      { lng: pickedLocation?.longitude!, lat: pickedLocation?.latitude! },
    )

    onCreatePlace(place)
  }

  const takeImageHandler = (imageUri: string) => {
    setSelectedImage(imageUri)
  }
  const pickLocationHandler = useCallback((location: PickedLocationType) => {
    setPickedLocation(location)
  }, [])

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicket onTakenImage={takeImageHandler} />
      <LocationPicker onPickImage={pickLocationHandler} />
      <Button onPress={savePlaceHandler} text='Add Place' />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
})

export default PlaceForm
