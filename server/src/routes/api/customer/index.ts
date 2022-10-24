import { log } from './../../../util/log'
import { Router } from 'express'
import config from '../../../../config'
import { response, ResponseType } from '../../../util/response'
import UserModel from '../../../model/user'

const customerRouter = Router()

customerRouter.use((req, res, next) => {
  const token = req.headers[config.token.requestHeader.toLocaleLowerCase()] as string
  if (!token) {
    return res.status(401).json({ err: 'Unauthorized' })
  }
  const userModel = new UserModel()
  userModel.validateToken(token)
    .then((token) => {
      res.setHeader(config.token.responseHeader, token)
      next()
    })
    .catch((err: Error) => {
      response(res).send(ResponseType.SUCCESS, undefined, err.message)
    })
})

customerRouter.use('/', (req, res) => {
  response(res).send(ResponseType.SUCCESS, undefined, '用户API')
})

export default customerRouter
