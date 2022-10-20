import { Express } from 'express'
import publicRouter from './public'

export const api = (server: Express) => {
  server.use('/api/v1/public', publicRouter)

  return server
}
