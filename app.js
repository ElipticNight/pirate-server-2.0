const express = require('express');
const app = express();
const server = require('http').createServer(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server:server });

const Routes = require('./router');
app.use(Routes);

const Channel = require('./channel');

let id = 0;
let clients = {};

wss.on('connection', function connection(ws) {
	ws.id = id++;
	clients[ws.id] = ws;
	
	console.log('new client connected');
	ws.send('client successfully connected');

	ws.on('message', function incoming(msg) {
		message = JSON.parse(msg);
		(async() => {
			if (message.target === 'joinroom') {
				let channel = new Channel();
				await channel.construct(message.roomid);
				ws.send(message.name);
				ws.send(message.roomid);
			}
		})();

	});

	ws.on('close', function close() {
		console.log('connection closed');
		id--;
	});

	console.log('number of clients: ', id);
});

server.listen(3000, () => console.log('listening on port 3000'));
