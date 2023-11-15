import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker'
import { useState } from 'react'
import { Colors } from '../../constants/colors'
import OutLinedButton from '../UI/OutLinedButton'

const ImagePicket = () => {
  const [image, setImage] = useState('')
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions()

  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.',
      )
      return false
    }

    return true
  }

  const takeImageHandler = async () => {
    const hasPermission = verifyPermissions()

    if (!hasPermission) {
      return
    }

    let result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Text>Nom image Taken yet.</Text>
        )}
      </View>
      <OutLinedButton
        text='Take Image'
        onPress={takeImageHandler}
        icon='camera'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default ImagePicket
