class Helper
{
    static getClientsWithStatus(clients) {
        let clientNames = clients.map(a => a.name);
		let clientStatus = clients.map(a => a.status);
		let result = clientStatus.reduce(function(result, field, index) {
			result[clientNames[index]] = field;
			return result;
        }, {})
        return result
    }
}

module.exports = Helper;