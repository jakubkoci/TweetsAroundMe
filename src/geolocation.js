// @flow
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { coords } = position
        const coordinates = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        }
        resolve({ coordinates })
      },
      error => reject(error)
    )
  })
}
