const {Player} = require("../Player/Player");

class Salon{
    constructor(id){
        this.id = id;
        this.players = [];
    }

    addPlayer(id,name, socket){
        if(this.players.filter(ele=>ele.id===id).length === 0 && this.players.length < this.getMaxPlayer()){
            this.players.push(new Player(id,name, socket));
            return true;
        }
        return false;
    }

    removePlayer(id){
        this.players = this.players.filter(ele=>ele.id !== id)
    }

    getPlayerCount(){
        return this.players.length;
    }

    getId(){
        return this.id;
    }

    getMaxPlayer(){
        return 4;
    }

    sendMessage(playerId, msg){
        let playerPseudo = "";
        let player = this.players.filter(ele=>ele.id===playerId);
        if(player[0] != null){
            playerPseudo = player[0].name;
        }
        this.players.filter(ele=>ele.id!==playerId).forEach(ele=>ele.sendMessageTo(playerPseudo,msg))
    }
}
module.exports = {
    Salon: Salon
}