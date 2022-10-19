import { createSocketServer } from './socket-io';
import { createHTTPServer } from './server';

const server = createHTTPServer()
createSocketServer(server)

