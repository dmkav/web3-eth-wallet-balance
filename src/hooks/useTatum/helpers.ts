// import { ErrorUtils } from '@tatumio/tatum'

/* TS misunderstand in @tatumio/tatum
 *  ErrorUtils.isErrorWithMessage checks if message is a string but confirms
 *  that return type is ErrorWithMessage where message is an array either strings or objects
 * I wasn't able to use ErrorUtils.isErrorWithMessage func
 * */

interface Error {
  code?: string
  message: string
}

interface TatumError {
  code?: string
  message: string[] | object[]
}

const isErrorWithMessage = (error: Record<string, any>): error is Error => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  )
}

const isErrorWithManyMessages = (
  error: Record<string, any>,
): error is TatumError => {
  return error?.message && Array.isArray(error.message)
}

export const mapToFirstError = (error: unknown) => {
  if (isErrorWithMessage(error)) {
    return error.message
  }

  if (isErrorWithManyMessages(error)) {
    return typeof error.message[0] === 'string'
      ? error.message[0]
      : JSON.stringify(error.message[0])
  }

  return JSON.stringify(error)
}
