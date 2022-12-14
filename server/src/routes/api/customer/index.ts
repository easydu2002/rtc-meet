import { log } from './../../../util/log'
import { Router } from 'express'
import config from '../../../../config'
import { response, ResponseType, setUserIDToRequest } from '../../../util/response'
import UserModel from '../../../model/user'
import userRouter from './user'
import groupRouter from './group'

const customerRouter = Router()

customerRouter.use((req, res, next) => {
  const token = req.headers[config.token.requestHeader.toLocaleLowerCase()] as string
  if (!token) {
    return res.status(401).json({ err: 'Unauthorized' })
  }
  UserModel.validateToken(token)
    .then(({ payload, token }) => {
      res.setHeader(config.token.responseHeader, token)
      setUserIDToRequest(payload.userId, req)
      next()
    })
    .catch((err: Error) => {
      response(res).send(ResponseType.SUCCESS, undefined, err.message)
    })
})

customerRouter.get('/', (req, res) => {
  response(res).send(ResponseType.SUCCESS, undefined, '用户API')
})

customerRouter.use(userRouter)
customerRouter.use(groupRouter)

export default customerRouter
