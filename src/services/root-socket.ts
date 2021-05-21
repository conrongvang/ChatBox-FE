import { io } from 'socket.io-client';

export default io('http://localhost:3003', {transports: ["websocket", "polling", "flashsocket"]});