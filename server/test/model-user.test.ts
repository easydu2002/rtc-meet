import { log } from './../src/util/log'
import { connect, connection } from 'mongoose'
import config from '../config'
import UserModel from '../src/model/user'

beforeAll(async () => {
  await connect(config.mongo.connectUrl)
})

test('login', async () => {
  const result = await UserModel.login('test001', 'qingsong123456')
  log(result)
})

// test('added', async () => {
//   const userModel = new UserModel()
//   const result = await userModel.addFriend('6350c65a360b76085540636e', '6350ea21b0c4f5bdba690d28')
//   log(result)
// })

afterAll(async () => {
  await connection.close()
})
