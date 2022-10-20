import { createHash } from 'crypto'

export const encodePassword = function (password: string) {
  const hash = createHash('sha256')
  hash.update(password)

  return hash.digest('hex')
}

export const validatePassword = function (encodeStr: string, password: string) {
  return encodePassword(password) === encodeStr
}
