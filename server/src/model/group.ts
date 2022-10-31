import { log } from './../util/log'
import { Model, model, Schema } from 'mongoose'
import CounterModel from './counter'
import UserModel from './user'

export interface IGroup {
  id: number
  _id?: number
  name: string
  adminId: number
  members: number[]
}

interface IGroupModel extends Model<IGroup, {}, {}> {
  createGroup: (adminId: number, name: string) => Promise<IGroup>
  removeGroup: (groupId: number) => Promise<boolean>
  joinGroup: (userId: number, groupId: number) => Promise<IGroup>
  exitGroup: (userId: number, groupId: number) => Promise<boolean>
  search: (keywords: string, page: { current: number, size: number }) => Promise<IGroup[]>
}

const Group = new Schema<IGroup, IGroupModel, {}>({
  _id: Number,
  name: { type: String, required: true },
  adminId: { type: Number, required: true },
  members: { type: [], default: [] }

}, { _id: false })

Group.statics.createGroup = async function (adminId: number, name: string): Promise<IGroup> {
  const user = await UserModel.findById(adminId)
  if (!user) {
    throw Error('该用户不存在!')
  }
  const groupId = await CounterModel.getNextSequenceValue('group')
  const model = new GroupModel({
    _id: groupId,
    name,
    adminId,
    members: [adminId]
  })
  user.groupIds.push(groupId)
  return await Promise.all([model.save(), user.save()])
    .then(([group]) => {
      return group
    })
    .catch(err => {
      log(err)
      return model
    })
}

Group.statics.joinGroup = async function (userId: number, groupId: number): Promise<IGroup> {
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

Group.statics.exitGroup = async function (userId: number, groupId: number): Promise<boolean> {
  const user = await UserModel.findById(userId)
  if (!user) {
    throw Error('该用户不存在!')
  }
  const group = await this.findById(groupId)
  if (!group) {
    throw Error('群组不存在')
  }
  if (userId === group.adminId) {
    await UserModel.updateMany({ $pull: { groupIds: { $in: [groupId] } } })
    await group.remove()
  } else {
    await user.updateOne({ $pull: { groupIds: { $in: [groupId] } } })
    await group.updateOne({ $pull: { members: { $in: [userId] } } })
  }
  return true
}

const GroupModel = model<IGroup, IGroupModel>('group', Group)

export default GroupModel
