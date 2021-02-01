class Helper
{
    static getClientsWithStatusAndAvatar(clients) {
        let clientNames = clients.map(a => a.name);
        let clientStatus = clients.map(a => a.status);
        let clientAvatar = clients.map(a => a.avatar);
		let result = clientStatus.reduce(function(result, field, index) {
			result[clientNames[index]] = [field, clientAvatar[index]];
			return result;
        }, {})
        return result
    }
}

module.exports = Helper;