// @flow
import { Base64 } from 'js-base64'
import { API_URL, CONSUMER_API_KEY, CONSUMER_API_SECRET_KEY } from 'react-native-dotenv'
import { logResponseAndThrowError } from './utils'

export async function fetchApiToken() {
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
    logResponseAndThrowError(response, 'Request for API token failed')
  }

  const apiBearerToken = await response.json()
  return apiBearerToken.access_token
}
