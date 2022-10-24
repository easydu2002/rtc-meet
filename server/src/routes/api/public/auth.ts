import { log } from './../../../util/log'
import { response, ResponseType } from './../../../util/response'
import { Router } from 'express'
import UserModel from '../../../model/user'
import config from '../../../../config'

interface AuthData {

  username: string
  password: string

}

const authRouter = Router()

authRouter.post('/authentication', (req, res) => {
  const data = req.body as AuthData
  res.send(data)
})

authRouter.post('/login', (req, res, next) => {
  const data = req.body as AuthData

  const model = new UserModel()

  model.login(data.username, data.password)
    .then((userInfo) => {
      if (userInfo.token) {
        res.setHeader(config.token.responseHeader, userInfo.token)
      }
      response(res).send(ResponseType.SUCCESS, userInfo)
    })
    .catch((err: Error) => {
      response(res).send(ResponseType.SUCCESS, undefined, err.message)
    })
})

export const bindAuthRouter = (router: Router): Router => router.use(authRouter)
