// @flow
import type { Position } from './types'

export function getCurrentPosition(): Promise<Position> {
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
