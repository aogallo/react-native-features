// change the key
const GOOGLE_API_KEY = 'AIzaSyCTCDNDtYPCpAD0FaKgHgdzCjMN1QUHnt4'

export function getMapPreview(lat: number, lng: number) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
  console.log(imagePreviewUrl)
  return imagePreviewUrl
}

export async function getAddress(lat: number, lng: number): Promise<string> {
  const url = `https://maps.googleapis.com/maps/api/gecode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch address!')
  }

  const data = await response.json()

  const address = data.results[0].formatted_address
  return address
}
