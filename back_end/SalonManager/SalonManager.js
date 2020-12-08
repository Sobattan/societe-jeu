const {Salon} = require("./Salon");
const { v4: uuidv4 } = require('uuid');
class SalonManager{
    constructor(){
        this.salonList = [];
    }

    joinSalon(playerName,playerId,idSalon){
        let salon = this.salonList.filter(ele=>ele.getId()===idSalon);
        if(salon[0] != null){
            salon[0].addPlayer(playerId, playerName);
        }

    }

    createNewSalon(){
        let salon = new Salon(uuidv4());
        this.salonList.push(salon);
        return salon.getId();
    }
}

module.exports = {
    SalonManager: SalonManager
}