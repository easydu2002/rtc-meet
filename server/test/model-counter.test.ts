import { log } from './../src/util/log'
import { connect, connection } from 'mongoose'
import config from '../config'
import CounterModel from '../src/model/counter'

beforeAll(async () => {
  await connect(config.mongo.connectUrl)
})

test('new', async () => {
  log('CounterModel.getNextSequenceValue', await CounterModel.getNextSequenceValue('user'))
})

afterAll(async () => {
  await connection.close()
})
