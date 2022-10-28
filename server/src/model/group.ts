import { Model, model, Schema } from 'mongoose'

export interface IGroup {
  id: number
  name: string
  adminId: number
  members: number[]
}

interface IGroupModel extends Model<IGroup, {}, {}> {
  createGroup: (info: IGroup) => Promise<IGroup>
  removeGroup: (groupId: number) => Promise<boolean>
}

const Group = new Schema<IGroup, IGroupModel, {}>({

  name: { type: String, required: true },
  members: { type: [], default: [] }

})

Group.statics.createGroup = async function (info: IGroup): Promise<IGroup> {
  const model = new GroupModel({ ...info })
  return await model.save()
}

Group.statics.removeGroup = async function (groupId: number): Promise<boolean> {
  return !!await GroupModel.findByIdAndDelete(groupId)
}

const GroupModel = model<IGroup, IGroupModel>('group', Group)

export default GroupModel
