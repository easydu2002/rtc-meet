import { errHandler, getUserIDFromRequest } from './../../../util/response'
import { Router } from 'express'
import UserModel from '../../../model/user'
import { response, ResponseType } from '../../../util/response'

const userRouter = Router()

userRouter.get('/user/:id', (req, res) => {
  UserModel.getUserVO(Number(req.params.id))
    .then(() => {})
    .catch(err => errHandler(res, err))
})

userRouter.post('/friend/:friendId', (req, res) => {
  const userId = getUserIDFromRequest(req)
  UserModel.addFriend(Number(userId), Number(req.params.friendId))
    .then((user) => {
      response(res).send(ResponseType.SUCCESS, user)
    })
    .catch(err => errHandler(res, err))
})

userRouter.delete('/friend/:friendId', (req, res, next) => {
  const userId = getUserIDFromRequest(req)
  UserModel.removeFriend(Number(userId), Number(req.params.friendId))
    .then(() => {
      response(res).send(ResponseType.SUCCESS, undefined, '删除成功')
    })
    .catch(err => errHandler(res, err))
})

userRouter.post('/group/:groupId', (req, res) => {
  const userId = getUserIDFromRequest(req)
  UserModel.joinGroup(Number(userId), Number(req.params.groupId))
    .then(() => {})
    .catch(err => errHandler(res, err))
})

userRouter.delete('/group/:groupId', (req, res) => {
  const userId = getUserIDFromRequest(req)
  UserModel.exitGroup(Number(userId), Number(req.params.groupId))
    .then(() => {})
    .catch(err => errHandler(res, err))
})

export default userRouter
