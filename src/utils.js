// @flow

type Body = {
  errors: any,
}

type Response = {
  status: number,
  json: () => Promise<Body>,
}

export async function logResponseAndThrowError(response: Response, message: string) {
  const { status } = response
  const { errors } = await response.json()
  console.log(message, { status, errors })
  throw new Error(message)
}
