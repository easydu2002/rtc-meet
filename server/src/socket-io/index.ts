import { log } from './../util/log'
import { Server } from 'socket.io'
import http from 'http'
import https from 'https'
import { Http2SecureServer } from 'http2'

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

export const createSocketServer = function (srv?: http.Server | https.Server | Http2SecureServer | number) {
  if (socketInstance) return socketInstance

  socketInstance = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(srv)

  socketInstance.on('connection', (socket) => {
    log('socket.io:connection')

    socket.send('hello')

    socket.on('message', (e) => {
      // e.
    })
  })
  return socketInstance
}

export const stopSocket = function (username: string) {
}
