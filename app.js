const express = require('express');
const app = express();
const server = require('http').createServer(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server:server });
const WebsocketHandler = require('./websocketHandler');

const Routes = require('./router');
app.use(Routes);

const Room = require('./room');

const Database = require('./database');
new Database().clearTables();


wss.on('connection', function connection(ws) {
	ws.id = WebsocketHandler.id;
	WebsocketHandler.clients[ws.id] = ws;
	WebsocketHandler.id++;

	let client = {
		socket_id: ws.id,
	}

	console.log('new client connected');

	ws.on('message', function incoming(msg) {
		message = JSON.parse(msg);
		client.name = message.name;
		(async() => {
			if (message.type === 'joinroom') {
				let room = await createRoom(message.roomid)
				await room.addNewClient(client);
			} else if (message.type === 'request host') {
				let room = await createRoom(message.roomid)
				await room.requestHost(client);
			} else if (message.type === 'ready') {
				let room = await createRoom(message.roomid)
				room.clientReady(client);
			} else if (message.type === 'unready') {
				let room = await createRoom(message.roomid)
				room.clientNotReady(client);
			}
		})();
	});

	ws.on('close', function close() {
		(async() => {
			let room = await createRoom(message.roomid)
			console.log('connection closed');
			await room.RemoveClient(client);
			delete WebsocketHandler.clients[ws.id];
		})();
	});

	console.log('number of clients: ', Object.keys(WebsocketHandler.clients).length);
});

async function createRoom(roomID) {
	let room = new Room();
	await room.construct(roomID);
	return room;
}
server.listen(3000, () => console.log('listening on port 3000'));
