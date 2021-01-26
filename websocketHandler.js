const Database = require('./database');

class WebsocketHandler
{
	static id = 0;
	static clients = {};
	static DB = new Database();
	static baseMessage = {
		type: '',
	};

	static async broadcastToRoom(roomID, message) {
		let socketIDs = await WebsocketHandler.DB.getClientsInRoom(roomID)
		let clients = WebsocketHandler.clients
		socketIDs.forEach(function(client) {
			clients[client.socket_id].send(message);
		});
	}

	static async broadcastToClient(socketID = false, message, name = "") {

		if(socketID !== false) {
			WebsocketHandler.clients[socketID].send(message);
		} else {
			//get client's socketID from their name, not yet necessary but might be
		}
	}

	static async newClientJoined(client, roomID) {
		let msg = WebsocketHandler.baseMessage;
		msg.type = "setup";
		let message = JSON.stringify(msg);
		await WebsocketHandler.broadcastToClient(client.socket_id, message);


		msg = WebsocketHandler.baseMessage;
		msg.type = "client joined";
		msg.clientName = client.name;
		message = JSON.stringify(msg);
		await WebsocketHandler.broadcastToRoom(roomID, message);
	}

	static async clientReady(clientName, roomID) {
		let msg = WebsocketHandler.baseMessage;
		msg.type = "client ready";
		msg.clientName = clientName;

		let message = JSON.stringify(msg);

		await WebsocketHandler.broadcastToRoom(roomID, message);
	}

	static async clientNotReady(clientName, roomID) {
		let msg = WebsocketHandler.baseMessage;
		msg.type = "client unready";
		msg.clientName = clientName;

		let message = JSON.stringify(msg);

		await WebsocketHandler.broadcastToRoom(roomID, message);
	}

	static async allClientsReady(roomID) {
		let msg = WebsocketHandler.baseMessage;
		msg.type = "all clients ready";

		let message = JSON.stringify(msg);

		await WebsocketHandler.broadcastToRoom(roomID, message);
	}
}

module.exports = WebsocketHandler;