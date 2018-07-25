// @flow
import { Base64 } from 'js-base64'
import { API_URL, CONSUMER_API_KEY, CONSUMER_API_SECRET_KEY } from 'react-native-dotenv'

export async function fetchTrends() {
  const apiToken = await fetchApiToken()
  const position = await getCurrentPosition()
  const locations = await fetchLocationsByPosition(apiToken, position)
  const [nearestLocation] = locations
  const trends = await fetchTrendsByLocation(apiToken, nearestLocation)
  return trends
}

async function fetchApiToken() {
  const credentialsBearerToken = Base64.encode(`${CONSUMER_API_KEY}:${CONSUMER_API_SECRET_KEY}`)

  const endpoint = `${API_URL}/oauth2/token`
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentialsBearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: 'grant_type=client_credentials',
  }

  const response = await fetch(endpoint, options)

  if (response.status !== 200) {
    logErrorResponse(response)
    throw new Error('Request for API token failed')
  }

  const apiBearerToken = await response.json()
  return apiBearerToken.access_token
}

function getCurrentPosition() {
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

async function fetchLocationsByPosition(apiToken, position) {
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
    logErrorResponse(response)
    throw new Error('Request for Trends data failed')
  }

  const trends = await response.json()
  return trends
}

async function fetchTrendsByLocation(apiToken, location) {
  const { woeid } = location
  const endpoint = `${API_URL}/1.1/trends/place.json?id=${woeid}`
  const options = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  }

  const response = await fetch(endpoint, options)

  if (response.status !== 200) {
    logErrorResponse(response)
    throw new Error('Request for Trends data failed')
  }

  const trends = await response.json()
  return trends
}

async function logErrorResponse(response, message) {
  const { status } = response
  const { errors } = await response.json()
  console.error(message, { status, errors })
  throw new Error(message)
}
