// @flow
import { API_URL } from 'react-native-dotenv'
import { fetchApiToken } from './auth'
import { getCurrentPosition } from './geolocation'
import { logResponseAndThrowError } from './utils'

export async function fetchTrends() {
  const apiToken = await fetchApiToken()
  const position = await getCurrentPosition()
  const locations = await fetchTrendingLocationsByPosition(apiToken, position)
  const [nearestLocation] = locations
  const trends = await fetchTrendingTopicsByLocation(apiToken, nearestLocation)
  return {
    trends,
    position,
  }
}

async function fetchTrendingLocationsByPosition(apiToken, position) {
  const { coordinates } = position
  const { latitude, longitude } = coordinates

  const endpoint = `${API_URL}/1.1/trends/closest.json?lat=${latitude}&long=${longitude}`
  const options = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  }

  const response = await fetch(endpoint, options)

  if (response.status !== 200) {
    logResponseAndThrowError(response, 'Request for trending locations by position failed')
  }

  const trends = await response.json()
  return trends
}

async function fetchTrendingTopicsByLocation(apiToken, location) {
  const { woeid } = location
  const endpoint = `${API_URL}/1.1/trends/place.json?id=${woeid}`
  const options = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  }

  const response = await fetch(endpoint, options)

  if (response.status !== 200) {
    logResponseAndThrowError(response, 'Request for trending topics by location failed')
  }

  const trends = await response.json()
  return trends.length > 0 ? trends[0].trends : []
}
