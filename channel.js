const Database = require('./database');

class Channel
{
	constructor (roomID) {
		console.log('roomID:  ', roomID);
		let DB = new Database();
		let test = DB.getRoomSettings(roomID);
		console.log('returned: ', test);
	}

	static createRoom (body) {
		let DB = new Database();
		let roomID;
		while (true) {
			roomID = Math.floor(Math.random() * (16777215 - 1048576) + 1048576).toString(16).toUpperCase();
			if (DB.roomExists(roomID)) {
				continue
			} else {
				break
			}
		}
		body.roomID = roomID;
		body.clientNo = 0;
		DB.createRoom(body);
		return (roomID);
	}
}

module.exports = Channel;