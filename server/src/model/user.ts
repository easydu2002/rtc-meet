import { log } from './../util/log'
import { CustomPayload, generateToken, validateToken } from './../util/token'
import { Model, model, Schema } from 'mongoose'
import { encodePassword, validatePassword } from '../util/password'
import { generateRandomAvatar } from '../util/user'
import config from '../../config'
import CounterModel from './counter'

export interface IUser {
  id: number
  _id?: number
  username: string
  password: string
  token?: string
  avatar?: string
  friendIds: number[]
  groupIds: number[]
}

interface IUserModel extends Model<IUser> {
  login: (username: string, password: string) => Promise<IUser>

  /**
    * 校验token，并根据配置决定是否续签
    */
  validateToken: (token: string) => Promise<{ token: string, payload: CustomPayload }>

  getUserVO: (id: number) => Promise<IUser>

  addFriend: (userId: number, friendId: number) => Promise<IUser>

  removeFriend: (userId: number, friendId: number) => Promise<boolean>

  search: (keywords: string, page: { current: number, size: number }) => Promise<IUser[]>

}

export const User = new Schema<IUser, Model<IUser>, {}>({
  _id: Number,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: String,
  avatar: String,
  friendIds: { type: [], default: [] },
  groupIds: { type: [], default: [] }
}, { _id: false })

User.statics.login = async function (username, password) {
  let user = await UserModel.findOne({ username })

  if (user != null) {
    if (!validatePassword(user.password, password)) {
      throw Error('账户名或密码错误!')
    }

    // 重新登录覆盖旧token
    const token = generateToken({ username, userId: user.id })

    await user.updateOne({ token })
    user.token = token
  } else {
    const userId = await CounterModel.getNextSequenceValue('user')
    const token = generateToken({ username, userId })

    user = new UserModel({
      _id: userId,
      username,
      password: encodePassword(password),
      token,
      avatar: generateRandomAvatar(),
      friends: []
    })

    // const err = user.validateSync()
    // log(err)

    await user.save()
  }

  return user
}

User.statics.validateToken = async function (token: string) {
  const payload = validateToken(token)
  if (!payload) {
    throw Error('未登录!')
  }

  const user = await UserModel.findOne({ username: payload.username })

  if (!user) {
    throw Error('该账号不存在!')
  }

  if (user.token !== token) {
    throw Error('登录失效或在别处登录!')
  }

  if (config.token.autoExtension && payload.exp && payload.iat) {
    const totalSecond = payload.exp - payload.iat
    const freeSecond = payload.exp - (Date.now() / 1000)
    if (freeSecond < (totalSecond / 10)) {
      const newToken = generateToken({ username: payload.username, userId: payload.userId })
      await user.updateOne({ token: newToken })
      return newToken
    }
  }

  return {
    token,
    payload
  }
}

User.statics.search = async function (keywords: string, page: { current: number, size: number }): Promise<IUser[]> {
  const userId = Number(keywords)
  const filter = userId ? { $or: [{ _id: parseInt(keywords) }, { username: { $regex: keywords } }] } : { username: { $regex: keywords } }

  return await UserModel.find(filter)
    .skip((page.current - 1) * page.size)
    .limit(page.size)
}

User.statics.addFriend = async function (userId, friendId): Promise<IUser> {
  if (userId === friendId) {
    throw Error('参数错误, id不能一样!')
  }
  const user = await UserModel.findById(userId)
  if (!user) {
    throw Error('账户不存在!')
  }
  if (user.friendIds.includes(friendId)) {
    throw Error('已存在该好友!')
  }
  const friend = await UserModel.findById(friendId)
  if (!friend) {
    throw Error('账户不存在!')
  }

  const task = [
    user.updateOne({ $push: { friendIds: friendId } }),
    friend.updateOne({ $push: { friendIds: userId } })
  ]

  return (await Promise.all(task))[0]
}

User.statics.removeFriend = async function (userId, friendId): Promise<boolean> {
  if (userId === friendId) {
    throw Error('参数错误, id不能一样!')
  }
  const user = await UserModel.findById(userId)
  if (!user) {
    throw Error('账户不存在!')
  }

  if (!user.friendIds.includes(friendId)) {
    throw Error('用户不存在该好友!')
  }

  const friend = await UserModel.findById(friendId)
  if (!friend) {
    throw Error('账户不存在!')
  }

  const task = [
    await user.updateOne({ $pull: { friendIds: { $in: [friendId] } } }),
    await friend.updateOne({ $pull: { friendIds: { $in: [userId] } } })
  ]

  return await Promise.all(task)
    .then(([userResult, friendResult]) => {
      return userResult === user && friend === friendResult
    })
    .catch((err) => {
      log(err)
      return false
    })
}

const UserModel = model<IUser, IUserModel>('user', User)

export default UserModel
