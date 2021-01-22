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

	createRoom() {
		let sql = `INSERT INTO rooms (id, client_no, setting_one, setting_two, setting_three, setting_four) VALUES (?, ?, ?, ?, ?, ?)`;
		let params = [
			'test',
			0,
			true,
			false,
			true,
			false
		]
		this.con.query(sql, params, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
	}
}

module.exports = Database;