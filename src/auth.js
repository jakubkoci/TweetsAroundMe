// @flow
import { Base64 } from 'js-base64'
import { API_URL, CONSUMER_API_KEY, CONSUMER_API_SECRET_KEY } from 'react-native-dotenv'
import { logResponseAndThrowError } from './utils'

// Error code according to documentation (https://developer.twitter.com/en/docs/basics/response-codes).
const INVALID_OR_EXPIRED_TOKEN_CODE = 89

export async function authorizedFetch(endpoint: string) {
  const apiToken = await fetchApiToken()
  const options = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  }

  const response = await fetch(endpoint, options)

  if (response.status === 401) {
    const { errors } = await response.json()
    const isTokenExpired = errors.some(error => INVALID_OR_EXPIRED_TOKEN_CODE === error.code)

    if (isTokenExpired) {
      await refreshApiToken()
    }
  }
  return fetch(endpoint, options)
}

/**
 * Returns cached API token or call auth API endpoint to get it.
 */
const fetchCachedApiToken: (refresh: ?boolean) => Promise<string> = memoizeFetchApiToken()

/**
 * Renew cached API token by calling auth API endpoint.
 */
function refreshApiToken() {
  fetchCachedApiToken(true)
}

/**
 * Returns function which will cache API key at least in-memory to avoid unnecessary calls to auth endpoint.
 */
function memoizeFetchApiToken(): () => Promise<string> {
  let cachedToken
  return async (refresh = false) => {
    if (!cachedToken || refresh) {
      cachedToken = await fetchApiToken()
    }

    console.log('token', cachedToken)

    return cachedToken
  }
}

async function fetchApiToken(): Promise<string> {
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
