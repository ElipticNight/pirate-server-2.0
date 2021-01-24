const Database = require('./database');

class Channel
{
	DB = null;
	id = null;
	connectedClients = null;
	settingOne = null;
	settingTwo = null;
	settingThree = null;
	settingFour = null;

	async construct(roomID) {
		this.DB = new Database();
		let roomSettings = await this.DB.getRoomSettings(roomID);
		this.id = roomSettings[0].id;
		this.connectedClients = roomSettings[0].client_no;
		this.settingOne = roomSettings[0].setting_one;
		this.settingTwo = roomSettings[0].setting_two;
		this.settingThree = roomSettings[0].setting_three;
		this.settingFour = roomSettings[0].setting_four;
	}

	static async createRoom(body) {
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

	async addNewClient() {
		return await this.DB.addClientToRoom(this.id);
	}

	async RemoveClient() {
		return await this.DB.removeClientFromRoom(this.id);
	}
}

module.exports = Channel;