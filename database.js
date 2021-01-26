class Database
{
	con = null;
	query = null;

	constructor() {
		const mysql = require('mysql');
		const util = require('util');
		this.con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database: "pirate-server"
		});
		this.con.connect(function(err) {
			if (err) throw err;
		});
		this.query = util.promisify(this.con.query).bind(this.con);
	}

	async clearTables() {
		// console.log('1');
		await this.query('TRUNCATE TABLE clients');
		return await this.query('DELETE FROM rooms');
	}

	createRoom(roomSettings) {
		let sql = "INSERT INTO rooms (id, client_no, setting_one, setting_two, setting_three, setting_four) VALUES (?, ?, ?, ?, ?, ?)";
		let params = [
			roomSettings.roomID,
			roomSettings.clientNo,
			roomSettings.one,
			roomSettings.two,
			roomSettings.three,
			roomSettings.four
		]
		// console.log('2');
		this.con.query(sql, params, function (err, result) {
			if (err) throw err;
		});
	}

	async roomExists(roomID) {
		// console.log('3');
		return (await this.getRoomSettings(roomID)).length !== 0;
	}

	async getRoomSettings(roomID) {
		// console.log('4');
		return await this.query('SELECT * FROM rooms WHERE id = ?', roomID);
	}

	async createNewClient(client) {
		let params = [
			client.socket_id,
			client.name,
			client.roomID,
			'',
			'setup'
		];
		// console.log('5');
		return await this.query('INSERT INTO clients (socket_id, name, room_id, board, status) VALUES (?, ?, ?, ?, ?)', params);
	}

	async deleteClient(client) {
		let params = [
			client.socket_id,
		];
		// console.log('6');
		return await this.query('DELETE FROM clients WHERE socket_id = ?', params);
	}

	async addClientToRoom(roomID) {
		// console.log('7');
		return await this.query('UPDATE rooms SET client_no = client_no+1 WHERE id = ?', roomID);
	}

	async removeClientFromRoom(roomID) {
		// console.log('8');
		return await this.query('UPDATE rooms SET client_no = client_no-1 WHERE id = ?', roomID);
	}

	async clientReady(client) {
		let params = [
			client.roomID,
			client.name
		]
		// console.log('9');
		return await this.query('UPDATE clients SET status = "ready" WHERE room_id = ? AND name = ?', params);
	}

	async clientNotReady(client) {
		let params = [
			client.roomID,
			client.name
		]
		// console.log('10');
		return await this.query('UPDATE clients SET status = "setup" WHERE room_id = ? AND name = ?', params);
	}

	async readyClientsNo(roomID) {
		// console.log('11');
		return await this.query('SELECT count(id) as countID FROM clients WHERE room_id = ? AND status = "ready"', roomID);
	}

	async getClientsInRoom(roomID) {
		// console.log('12');
		// console.log(roomID)
		return await this.query('SELECT * FROM clients WHERE room_id = ?', roomID);
	}
}

module.exports = Database;