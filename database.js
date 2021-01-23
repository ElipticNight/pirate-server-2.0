class Database
{
	constructor() {
		const mysql = require('mysql');
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

	roomExists(roomID) {
		let sql = "SELECT * FROM rooms WHERE id = ?"
		let params = [
			roomID
		]
		this.con.query(sql, params, function (err, result) {
			if (err) throw err;
			console.log(result.length !== 0);
		});
	}

	getRoomSettings(roomID) {
		let sql = "SELECT * FROM rooms WHERE id = ?"
		let params = [
			roomID
		]
		this.con.query(sql, params, function (err, result) {
			if (err) throw err;
			console.log('result: ', result);
			return (result);
		});
	}
}

module.exports = Database;