import { log } from './util/log'
import { createSocketServer } from './socket-io'
import { createHTTPServer } from './server'
import { connect } from 'mongoose'
import config from '../config'
import path from 'path'

// const startTime: number = Date.now()
const staticPath = path.join(__dirname, '../public')

connect(config.mongo.connectUrl)
  .then(() => {
    log('connected to ' + config.mongo.connectUrl)
    const server = createHTTPServer({ staticPath })
    createSocketServer(server)

    // log('start success, use ', (Date.now() - startTime), 'ms')
  })
  .catch(err => {
    log(err)
    process.exit()
  })
