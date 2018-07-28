// @flow
import { API_URL } from 'react-native-dotenv'
import { fetchCachedApiToken as fetchApiToken } from './auth'
import { getCurrentPosition } from './geolocation'
import { logResponseAndThrowError } from './utils'
import type { TrendingTopic, Position, TrendsData } from './types'

type Location = {
  woeid: number | string,
}

export async function fetchTrends(): Promise<TrendsData> {
  const position = await getCurrentPosition()
  const locations = await fetchTrendingLocationsByPosition(position)
  const [nearestLocation] = locations
  const trends = await fetchTrendingTopicsByLocation(nearestLocation)
  return {
    trends,
    position,
  }
}

async function fetchTrendingLocationsByPosition(position: Position): Promise<Array<Location>> {
  const { coordinates } = position
  const { latitude, longitude } = coordinates

  const endpoint = `${API_URL}/1.1/trends/closest.json?lat=${latitude}&long=${longitude}`
  const apiToken = await fetchApiToken()
  const options = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  }

  const response = await fetch(endpoint, options)

  if (response.status !== 200) {
    logResponseAndThrowError(response, 'Request for trending locations by position failed')
  }

  const locations = await response.json()
  return locations
}

async function fetchTrendingTopicsByLocation(location: Location): Promise<Array<TrendingTopic>> {
  const { woeid } = location

  const endpoint = `${API_URL}/1.1/trends/place.json?id=${woeid}`
  const apiToken = await fetchApiToken()
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
