import { log } from './log'
import { sign, verify, JwtPayload } from 'jsonwebtoken'
import config from '../../config'

export interface CustomPayload extends JwtPayload {
  username: string
  userId: number
}

export const generateToken = function (payload: CustomPayload) {
  const key = config.token.secretOrPrivateKey

  const options = {
    expiresIn: config.token.expiresIn
  }

  return sign(payload, key, options)
}

export const validateToken = function (token: string): CustomPayload | false {
  try {
    return verify(token, config.token.secretOrPrivateKey) as CustomPayload
  } catch (err) {
    log(err)
    return false
  }
}
