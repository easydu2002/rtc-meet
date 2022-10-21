import { response, ResponseType } from './../../../util/response'
import { Router } from 'express'
import UserModel from '../../../model/user'

interface AuthData {

  username: string
  password: string

}

const authRouter = Router()

authRouter.post('/authentication', (req, res) => {
  const data = req.body as AuthData
  res.send(data)
})

authRouter.post('/login', (req, res) => {
  const data = req.body as AuthData

  const model = new UserModel()

  model.login(data.username, data.password)
    .then((userInfo) => {
      response(res).send(ResponseType.SUCCESS, userInfo)
    })
    .catch(() => {

    })
})

export const bindAuthRouter = (router: Router): Router => router.use(authRouter)
