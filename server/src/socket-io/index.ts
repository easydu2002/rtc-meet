import { log } from './../util/log'
import { Server, Socket } from 'socket.io'
import http from 'http'
import https from 'https'
import { Http2SecureServer } from 'http2'
import config from '../../config'
import UserModel from '../model/user'

interface ClientToServerEvents {

  'login': (username: string, password: string) => void
}

interface ServerToClientEvents {

}
interface InterServerEvents {
  ping: () => void
}

interface SocketData {
  name: string
  age: number
}

let socketInstance: Server

function installAuth (socket: Socket): void {
  socket.use(([event, ...args], next) => {
    const token = socket.handshake.query[config.token.requestHeader] as string
    if (!token) {
      return next(new Error('unauthorized event'))
    }
    UserModel.validateToken(token)
      .then(() => next())
      .catch(next)
  })
  socket.on('error', (err) => {
    log(err)
    if (err) {
      socket.disconnect()
    }
  })
}

export const createSocketServer = function (srv?: http.Server | https.Server | Http2SecureServer | number): Server {
  if (socketInstance) return socketInstance

  socketInstance = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(srv)

  socketInstance.on('connection', (socket) => {
    log('socket.io:connection')

    installAuth(socket)

    socket.send('hello')

    socket.on('message', (e) => {
      // e.
    })
  })
  return socketInstance
}

export const stopSocket = function (username: string) {
}
