const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server:server });

let id = 0;
let clients = {};

wss.on('connection', function connection(ws) {
	ws.id = id++;
	clients[ws.id] = ws;
	
	console.log('new client connected');
	ws.send('client successfully connected');
	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
		ws.send('recieved message ' + message);
	});

	ws.on('close', function close() {
		console.log('connection closed');
		ws.id = id--;
	});

	console.log(id);
});

  server.listen(3000, () => console.log('listening on port 3000'));


  //axios to create room

  //connect to ws