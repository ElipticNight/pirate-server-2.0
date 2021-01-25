const Database = require('./database');

class WebsocketHandler
{
	static id = 0;
	static clients = {};
	static DB = new Database();

	static async broadcastToRoom(roomID) {
		let socketIDs = await WebsocketHandler.DB.getRoomSocketIDs(roomID)
		let clients = WebsocketHandler.clients
		socketIDs.forEach(function(socket) {
			clients[socket.socket_id].send('broadcast test');
		});
	}
}

module.exports = WebsocketHandler;