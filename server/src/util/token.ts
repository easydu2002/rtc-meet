import { sign, verify } from 'jsonwebtoken'
import config from '../../config'

interface Payload {
  username: string
}

export const generateToken = function (payload: Payload) {
  const key = config.token.secretOrPrivateKey

  const options = {
    expiresIn: config.token.expiresIn
  }

  return sign(payload, key, options)
}

export const validateToken = function (token: string): Payload | false {
  try {
    return verify(token, config.token.secretOrPrivateKey) as Payload
  } catch (err) {
    return false
  }
}
