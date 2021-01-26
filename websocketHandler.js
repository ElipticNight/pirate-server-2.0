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

	static async newClientJoined(clientName, roomID) {
		let msg = WebsocketHandler.baseMessage;
		msg.type = "client joined";
		msg.clientName = clientName;

		let message = JSON.stringify(msg);

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