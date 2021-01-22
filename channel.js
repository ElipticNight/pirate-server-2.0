class Channel
{
    constructor() {
        //
    }

    static createRoom() {
        return (
            Math.floor(Math.random() * (16777215 - 1048576) + 1048576)
            .toString(16)
            .toUpperCase()
        );
    }
}

module.exports = Channel;