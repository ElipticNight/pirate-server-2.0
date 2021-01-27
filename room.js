const Database = require('./database');
const WebsocketHandler = require('./websocketHandler');

class Room
{
	DB = null;
	WSH = null;
	id = null;
	connectedClientsNo = null;
	settingOne = null;
	settingTwo = null;
	settingThree = null;
	settingFour = null;

	async construct(roomID) {
		this.DB = new Database();
		let roomSettings = await this.DB.getRoomSettings(roomID);
		this.id = roomSettings[0].id;
		this.connectedClientsNo = roomSettings[0].client_no;
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

	async requestHost(client) {
		if((await this.DB.getRoomHost(this.id)).length > 0) {
			await WebsocketHandler.hostRequestResponse(client, false);
		} else {
			await this.DB.setRoomHost(client)
			await WebsocketHandler.hostRequestResponse(client, true);
		}
	}

	async addNewClient(client) {
		client.roomID = this.id;
		await WebsocketHandler.setupNewClient(client, this.id);
		await this.DB.createNewClient(client);
		await this.DB.addClientToRoom(this.id);
		await WebsocketHandler.newClientJoined(client, this.id);
	}

	async RemoveClient(client) {
		await this.DB.deleteClient(client);
		await this.DB.removeClientFromRoom(this.id);
		await WebsocketHandler.clientLeft(client, this.id);
	}

	async clientReady(client) {
		client.roomID = this.id;
		await this.DB.clientReady(client);
		let readyClientsNo = await this.DB.readyClientsNo(this.id)
		await WebsocketHandler.clientReady(client.name, this.id);
		if(readyClientsNo[0].countID === this.connectedClientsNo) {
			await WebsocketHandler.allClientsReady(this.id);
		} else {
			return
		}
	}

	async clientNotReady(client) {
		client.roomID = this.id;
		await this.DB.clientNotReady(client);
		await WebsocketHandler.clientNotReady(client.name, this.id);
	}

	async startGame(client) {
		if(client.name === (await this.DB.getRoomHost(this.id))[0].name) {
			await WebsocketHandler.startGame(this.id);
		}
	}
}

module.exports = Room;