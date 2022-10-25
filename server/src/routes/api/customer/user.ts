import { log } from './../../../util/log'
import { Router } from 'express'
import UserModel from '../../../model/user'
import { response, ResponseType } from '../../../util/response'

const userRouter = Router()

userRouter.get('/user/:id', (req, res) => {
  UserModel.getUserVO(Number(req.params.id))
    .then(() => {})
    .catch(() => {})
})

userRouter.post('/friend/:userId/:friendId', (req, res) => {
  const data = req.body as {
    userId: number
    friendId: number
  }

  UserModel.addFriend(data.userId, data.friendId)
    .then((user) => {
      response(res).send(ResponseType.SUCCESS, user)
    })
    .catch((err) => {
      response(res).send(ResponseType.SUCCESS, undefined, err)
    })
})

userRouter.delete('/friend/:userId/:friendId', (req, res) => {
  UserModel.removeFriend(Number(req.params.userId), Number(req.params.friendId))
    .then(() => {
      response(res).send(ResponseType.SUCCESS, undefined, '删除成功')
    })
    .catch((err) => {
      log(err)
      response(res).send(ResponseType.SUCCESS, undefined, err)
    })
})

userRouter.post('/group/:userId/:groupId', (req, res) => {
  UserModel.joinGroup(Number(req.params.userId), Number(req.params.groupId))
    .then(() => {})
    .catch(() => {})
})

userRouter.delete('/group/:userId/:groupId', (req, res) => {
  UserModel.exitGroup(Number(req.params.userId), Number(req.params.groupId))
    .then(() => {})
    .catch(() => {})
})

export default userRouter
