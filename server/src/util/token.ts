import { log } from './log'
import { sign, verify } from 'jsonwebtoken'
import config from '../../config'

interface CustomPayload {
  username: string
}

interface Payload extends CustomPayload {
  iat: number
  exp: number
}

export const generateToken = function (payload: CustomPayload) {
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
    log(err)
    return false
  }
}
