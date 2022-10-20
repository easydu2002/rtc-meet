import { model, Schema } from 'mongoose'
import { User } from './user'

const Group = new Schema({

  groupName: { type: String },
  members: [User]

})

const GroupModel = model('group', Group)

export default GroupModel
