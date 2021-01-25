const Database = require('./database');

class WebsocketHandler
{
	static id = 0;
	static clients = {};
	static DB = new Database();

	static async broadcastToRoom(roomID, message) {
		let socketIDs = await WebsocketHandler.DB.getClientsInRoom(roomID)
		let clients = WebsocketHandler.clients
		socketIDs.forEach(function(client) {
			clients[client.socket_id].send(message);
		});
	}

	static async clientReady(clientID, roomID) {
		let message = JSON.stringify({
			target: 'ready',
			client: clientID
		});

		await WebsocketHandler.broadcastToRoom(roomID, message);
	}

	static async clientNotReady(clientID, roomID) {
		let message = JSON.stringify({
			target: 'unready',
			client: clientID
		});

		await WebsocketHandler.broadcastToRoom(roomID, message);
	}

	static async allClientsReady(roomID) {
		let message = JSON.stringify({
			target: 'all Clients Ready'
		});

		await WebsocketHandler.broadcastToRoom(roomID, message);
	}
}

module.exports = WebsocketHandler;