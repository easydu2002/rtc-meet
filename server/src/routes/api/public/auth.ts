import { Router } from 'express'
import UserModel from '../../../model/user'

interface AuthData {

  username: string
  password: string

}

export const bindAuthRouter = function (router: Router) {
  router.post('/authentication', (req, res) => {
    const data = req.body as AuthData
    res.send(data)
  })

  router.post('/login', async (req, res) => {
    const data = req.body as AuthData

    const model = new UserModel()

    model.login(data.username, data.password)
  })
}
