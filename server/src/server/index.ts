import express from 'express'
import { createServer } from 'http'
import config from '../../config'
import { getServerUrl } from '../util/server'
import { api } from './../routes/api/index'
import { log } from './../util/log'

export const createHTTPServer = function ({ staticPath }) {
  const app = express()

  app
    .use(config.http.staticPrefix, express.static(staticPath))
    .use(express.json())
    .get('/', (req, res) => res.send('Welcome to xxx!'))

  api(app)

  log('express: start static server on ', getServerUrl() + config.http.staticPrefix)

  const server = createServer(app)

  server.listen(config.http.port, config.http.host, () => log('listen on', getServerUrl()))

  return server
}
