const express = require('express');
const app = express();
const server = require('http').createServer(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server:server });

const Routes = require('./router');
app.use(Routes);

// const mysql = require('mysql');
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: ""
// });
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to database");
// });


let id = 0;
let clients = {};

wss.on('connection', function connection(ws) {
	ws.id = id++;
	clients[ws.id] = ws;
	
	console.log('new client connected');
	ws.send('client successfully connected');

	ws.on('message', function incoming(msg) {
		console.log('received: %s', msg);
		let message = JSON.parse(msg);
		if (message.target === 'joinroom') {
			ws.send(message.name);
			ws.send(message.roomid);
		}
	});

	ws.on('close', function close() {
		console.log('connection closed');
		id--;
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
