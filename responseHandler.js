const Database = require('./database');

class ResponseHandler
{
    DB = null;
    roomClients = null;
    totalClientsNo = null;
    clientResponses = null;
    totalClientsResponded = null;

	async construct(roomID) {
		this.DB = new Database();
        this.roomClients = await this.DB.getClientsInRoom(roomID);
        this.totalClientsNo = this.roomClients.length;
        this.clientResponses = this.roomClients.map(a => a.response);
        this.totalClientsResponded = this.roomClients.reduce(function(total, current) {
			if(current.response !== null) {
                return total + 1;
            } else {
                return total;
            }
        }, 0)
        console.log(this.totalClientsNo, this.clientResponses);
	}

    async createRoom(roomID) {
        let room = new Room();
        //await room.construct(roomID);
        return room;
    }

	async recordResponse(response) {
        console.log('here');
        await this.DB.recordClientResponse(response);
	}
}

module.exports = ResponseHandler;