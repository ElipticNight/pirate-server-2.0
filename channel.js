class Channel
{
	constructor() {
		//
	}

	static createRoom(body) {
		let roomID = Math.floor(Math.random() * (16777215 - 1048576) + 1048576).toString(16).toUpperCase()
		//save the room in the database with the settings
		return (roomID);
	}
}

module.exports = Channel;