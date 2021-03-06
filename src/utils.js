// @flow

type ErrorsBody = {
  errors: any,
}

type Response = {
  status: number,
  json: () => Promise<ErrorsBody>,
}

export async function logResponseAndThrowError(response: Response, message: string): void {
  const { status } = response
  const { errors } = await response.json()
  console.log(message, { status, errors })
  throw new Error(message)
}
