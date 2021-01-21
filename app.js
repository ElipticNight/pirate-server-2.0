const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');

var Routes = require('./router');

// Import my test routes into the path '/test'
app.use(Routes);

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


//axios to create room (post request)
//generates a roomid and checks to see if it exists
//sends id back to client

//connect to ws
//client is added to "waiting" room
//request to join a room
//server updates client's room to the channelid
