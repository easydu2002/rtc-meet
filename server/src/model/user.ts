import { log } from './../util/log'
import GroupModel, { IGroup } from './group'
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

  joinGroup: (userId: number, groupId: number) => Promise<IGroup>

  exitGroup: (userId: number, groupId: number) => Promise<boolean>
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

  user.friendIds.push(friendId)
  friend.friendIds.push(userId)

  await Promise.all([user.save(), friend.save()])
  return user
}

User.statics.removeFriend = async function (userId, friendId): Promise<boolean> {
  if (userId === friendId) {
    throw Error('参数错误, id不能一样!')
  }
  const user = await UserModel.findById(userId)
  if (!user) {
    throw Error('账户不存在!')
  }

  const userFriendIndex = user.friendIds.findIndex(item => item === friendId)
  if (!user.friendIds.length || userFriendIndex === -1) {
    throw Error('用户不存在该好友!')
  }

  const friend = await UserModel.findById(friendId)
  if (!friend) {
    throw Error('账户不存在!')
  }
  const friendUserIndex = friend.friendIds.findIndex(item => item === userId)

  user.friendIds.splice(userFriendIndex, 1)
  friend.friendIds.splice(friendUserIndex, 1)

  return await Promise.all([user.save(), friend.save()])
    .then(([userResult, friendResult]) => {
      return userResult === user && friend === friendResult
    })
    .catch((err) => {
      log(err)
      return false
    })
}

User.statics.joinGroup = async function (userId: number, groupId: number): Promise<IGroup> {
  const user = await UserModel.findById(userId)
  if (!user) {
    throw Error('该用户不存在!')
  }
  if (user.groupIds.includes(groupId)) {
    throw Error('用户已在该群中!')
  }
  const group = await GroupModel.findById(groupId)
  if (!group) {
    throw Error('该群组不存在!')
  }

  group.members.push(userId)
  user.groupIds.push(groupId)

  return await Promise.all([group.save(), user.save()])
    .then(() => {
      return group
    })
    .catch((err) => {
      throw Error(err)
    })
}

const UserModel = model<IUser, IUserModel>('user', User)

export default UserModel
