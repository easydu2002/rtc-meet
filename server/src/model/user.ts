import { ResponseType } from './../util/response'
import { log } from './../util/log'
import { generateToken, validateToken } from './../util/token'
import { Model, model, Schema } from 'mongoose'
import { encodePassword, validatePassword } from '../util/password'
import { generateRandomAvatar } from '../util/user'
import config from '../../config'

interface IUser {
  id?: string
  username: string
  password: string
  token?: string
  avatar?: string
  friends?: IUser[]
}

interface IFriend {

  id?: string
  username?: string
  nickname?: string
  avatar?: string

}

export const Friend = new Schema<IFriend>({

  username: String,
  nickname: String,
  avatar: String

})

export const User = new Schema<IUser, Model<IUser>, {
  /**
   * 登录，（不存在自动注册）
   */
  login: (username: string, password: string) => Promise<IUser>
  /**
   * 校验token，并根据配置决定是否续签
   */
  validateToken: (token: string) => Promise<string>

  /**
   * 获取好友列表
   */
  getFriendList: (userId: string) => Promise<IUser[]>

  /**
   * 添加好友
   */
  addFriend: (userId: string, friendId: string) => Promise<boolean>

  /**
   * 删除好友
   */
  removeFriend: (userId: string, friendId: string) => Promise<boolean> }>({
      id: Number,
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      token: String,
      avatar: String,
      friends: [Friend]
    })

User.methods.login = async (username, password) => {
  let user = await UserModel.findOne({ username })

  if (user != null) {
    if (!validatePassword(user.password, password)) {
      throw Error('账户名或密码错误!')
    }

    // 重新登录覆盖旧token
    const token = generateToken({ username })

    await user.updateOne({ token })
    user.token = token
  } else {
    const token = generateToken({ username })

    user = new UserModel({
      username,
      password: encodePassword(password),
      token,
      avatar: generateRandomAvatar()
    })

    // const err = user.validateSync()
    // log(err)

    await user.save()
  }

  return {
    id: user._id.toString(),
    username: user.username,
    password: '******',
    token: user.token,
    friends: user.friends,
    avatar: user.avatar
  }
}

User.methods.validateToken = async function (token: string) {
  const payload = validateToken(token)
  if (!payload) {
    throw Error('未登录!')
  }

  const user = await UserModel.findOne({ username: payload.username })

  if (user == null) {
    throw Error('该账号不存在!')
  }

  if (user.token !== token) {
    throw Error('账号在别处登录!')
  }

  if (config.token.autoExtension) {
    const totalSecond = payload.exp - payload.iat
    const freeSecond = payload.exp - (Date.now() / 1000)
    if (freeSecond < (totalSecond / 10)) {
      const newToken = generateToken({ username: payload.username })
      await user.updateOne({ token: newToken })
      return newToken
    }
  }

  return token
}

User.methods.getFriendList = async function (userId: string): Promise<IUser[]> {
  const user = await UserModel.findById(userId)
  return user?.friends ?? []
}

User.methods.addFriend = async function (userId, friendId) {
  try {
    const user = await UserModel.findById(userId)
    if (user == null) return false
    const friend = await UserModel.findById(friendId)
    if (friend == null) return false

    user?.friends?.push(friend)
    friend?.friends?.push(friend)

    await Promise.all([user.save(), friend.save()])

    return true
  } catch (err) {
    log(err)
    return false
  }
}

User.methods.removeFriend = async function (userId, friendId): Promise<boolean> {
  try {
    const user = await UserModel.findById(userId)

    if ((user == null) || (user.friends == null)) return false

    const friend = await UserModel.findById(friendId)

    if ((friend == null) || (friend.friends == null)) return false

    user.friends.splice(user.friends.findIndex(item => item.username === friend.username), 1)
    friend.friends.splice(friend.friends.findIndex(item => item.username === user.username), 1)

    await Promise.all([user.save(), friend.save()])

    return true
  } catch (err) {
    return false
  }
}

const UserModel = model('user', User)

export default UserModel
