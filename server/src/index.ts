import { log } from './util/log'
import { createSocketServer } from './socket-io'
import { createHTTPServer } from './server'
import { connect } from 'mongoose'
import config from '../config'
import path from 'path'

const staticPath = path.join(__dirname, '../public')

connect(config.mongo.connectUrl)
  .then(() => {
    log('loaded mongodb...')
    const server = createHTTPServer({ staticPath })
    createSocketServer(server)
  })
  .catch(err => {
    log(err)
    process.exit()
  })
