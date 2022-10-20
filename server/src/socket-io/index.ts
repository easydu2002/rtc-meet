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

export const createSocketServer = function (srv?: http.Server | https.Server | Http2SecureServer | number) {
  const socketServer = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(srv)

  socketServer.on('connection', (socket) => {
    log('socket.io:connection')

    // @ts-expect-error
    socket.send('hello')
  })
}
