const Database = require('./database');

class Channel
{
	id = null;
	connectedClients = null;
	settingOne = null;
	settingTwo = null;
	settingThree = null;
	settingFour = null;

	async construct (roomID) {
		let DB = new Database();
		let roomSettings = await DB.getRoomSettings(roomID);
		this.id = roomSettings[0].id;
		this.connectedClients = roomSettings[0].client_no;
		this.settingOne = roomSettings[0].setting_one;
		this.settingTwo = roomSettings[0].setting_two;
		this.settingThree = roomSettings[0].setting_three;
		this.settingFour = roomSettings[0].setting_four;
		return 'constructed';
	}


	static async createRoom (body) {
		let DB = new Database();
		let roomID;
		while (true) {
			roomID = Math.floor(Math.random() * (16777215 - 1048576) + 1048576).toString(16).toUpperCase();
			if (await DB.roomExists(roomID)) {
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