class Player{
    constructor(id,name, socket){
        this.id = id;
        this.name = name;
        this.socket = socket;
    }

    sendMessageTo(playerId, msg){
        this.socket.emit('messageRecu', playerId, msg);
    }
};

module.exports = {
    Player : Player
};