const Database = require('./database');

class Channel
{
	constructor() {
		//
	}

	static createRoom(body) {
		let roomID = Math.floor(Math.random() * (16777215 - 1048576) + 1048576).toString(16).toUpperCase()
		body.roomID = roomID;
		body.clientNo = 0;
		new Database().createRoom(body);
		return (roomID);
	}
}

module.exports = Channel;