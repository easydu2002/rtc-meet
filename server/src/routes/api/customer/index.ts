import { Router } from 'express'
import config from '../../../../config'
import { response, ResponseType } from '../../../util/response'
import UserModel from '../../../model/user'
import userRouter from './user'

const customerRouter = Router()

customerRouter.use((req, res, next) => {
  const token = req.headers[config.token.requestHeader.toLocaleLowerCase()] as string
  if (!token) {
    return res.status(401).json({ err: 'Unauthorized' })
  }
  UserModel.validateToken(token)
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

customerRouter.use(userRouter)

export default customerRouter
