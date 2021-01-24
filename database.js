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
			console.log("Connected to database");
		});
		this.query = util.promisify(this.con.query).bind(this.con);
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
		this.con.query(sql, params, function (err, result) {
			if (err) throw err;
		});
	}

	async roomExists(roomID) {
		return (await this.getRoomSettings(roomID)).length !== 0;
	}

	async getRoomSettings(roomID) {
		return await this.query('SELECT * FROM rooms WHERE id = ?', roomID);
	}

	async addClientToRoom(roomID) {
		return await this.query('UPDATE rooms SET client_no=client_no+1 WHERE id = ?', roomID);
	}

	async removeClientFromRoom(roomID) {
		return await this.query('UPDATE rooms SET client_no=client_no-1 WHERE id = ?', roomID);
	}
}

module.exports = Database;