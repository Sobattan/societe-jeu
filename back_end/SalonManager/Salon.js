const {Player} = require("../Player/Player");

class Salon{
    constructor(id){
        this.id = id;
        this.players = [];
    }

    addPlayer(id,name){
        this.players.push(new Player(id,name));
    }

    getId(){
        return this.id;
    }
}
module.exports = {
    Salon: Salon
}