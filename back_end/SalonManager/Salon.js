const {Player} = require("../Player/Player");

class Salon{
    constructor(id, game){
        this.id = id;
        this.players = [];
        this.game = game;
    }

    addPlayer(id,name, socket){
        if(this.players.filter(ele=>ele.id===id).length === 0 && this.players.length < this.getMaxPlayer()){
            this.players.push(new Player(id,name, socket));
            console.log(name);
            this.game.addPlayer(id,name,socket);
            return true;
        }
        return false;
    }

    removePlayer(id){
        //gérer la libération d'une place dans la partie
        this.players = this.players.filter(ele=>ele.id !== id)
    }

    getPlayerCount(){
        return this.players.length;
    }

    getId(){
        return this.id;
    }

    getGame(){
        return this.game;
    }

    getMaxPlayer(){
        //return this.game.getMaxPlayer();
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