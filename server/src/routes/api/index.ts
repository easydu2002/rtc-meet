import { log } from './../../util/log'
import { Express } from 'express'
import customerRouter from './customer'
import publicRouter from './public'

export const api = (server: Express): Express => {
  server.use('/api/v1/public', publicRouter)
  log('use route: ', '/api/v1/public')

  server.use('/api/v1/customer', customerRouter)
  log('use route: ', '/api/v1/customer')

  return server
}
