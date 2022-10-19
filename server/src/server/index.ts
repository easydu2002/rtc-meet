import express from 'express';
import { createServer } from 'http';
import config from '../../config';
import { api } from './../routes/api/index';
import { log } from './../util/log';

export const createHTTPServer = function() {

  const app = express()

  app.use(express.json())

  app.get('/', (req, res) => {

    res.send('Welcome to xxx!')
  })

  api(app)
  
  const server = createServer(app)

  server.listen(config.http.port, config.http.host, () => {

    log('listen on', server.address());
    
  })

  return server
}