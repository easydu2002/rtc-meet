import { Model } from 'mongoose'
import { IUser, IFriend } from './../model/user'

export const userToFriend = function (user: IUser): IFriend {
  return {
    id: user.id,
    username: user.username,
    avatar: user.avatar
  }
}

// async function getById<T, U> (model: Model<T, U>, id: number, notFoundMsg?: string): Promise<T> {
//   try {
//     return await model.findById(id)
//   } catch {
//     throw Error(notFoundMsg ?? '数据不存在')
//   }
// }

// export { getById }
