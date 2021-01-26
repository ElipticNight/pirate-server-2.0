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

	static async clientReady(clientID, roomID) {
		let msg = WebsocketHandler.baseMessage;
		msg.type = "ready";
		msg.client = clientID;

		let message = JSON.stringify(msg);

		await WebsocketHandler.broadcastToRoom(roomID, message);
	}

	static async clientNotReady(clientID, roomID) {
		let msg = WebsocketHandler.baseMessage;
		msg.type = "unready";
		msg.client = clientID;

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