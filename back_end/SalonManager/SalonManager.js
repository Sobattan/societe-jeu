const {Salon} = require("./Salon");
const { v4: uuidv4 } = require('uuid');
class SalonManager{
    constructor(){
        this.salonList = [];
    }

    joinSalon(playerName, playerId, playerSocket, idSalon){
        let salon = this.salonList.filter(ele=>ele.getId()===idSalon);
        if(salon[0] != null){
            return salon[0].addPlayer(playerId, playerName, playerSocket);
        }
        return false;

    }

    leaveSalon(playerId, idSalon){
        let salon = this.salonList.filter(ele=>ele.getId()===idSalon);
        if(salon[0] != null){
            salon[0].removePlayer(playerId);
            this.deleteSalonIfEmpty(salon[0]);
        }
    }

    deleteSalonIfEmpty(salon){
        console.log("trying to delete");
        if(salon != null){
            if(salon.getPlayerCount() == 0){
                this.deleteSalon(salon.getId());
            }
        }
    }

    deleteSalon(id){
        this.salonList = this.salonList.filter(ele=> ele.getId() !== id);
        console.log("delete success");
    }

    createNewSalon(){
        let salon = new Salon(uuidv4());
        this.salonList.push(salon);
        setTimeout(()=>{this.deleteSalonIfEmpty(salon)}, 100000);
        return salon.getId();
    }

    getSalon(id){
        let salon = this.salonList.filter(ele=>ele.getId()===id);
        if(salon[0] != null){
           return salon[0];
        }
        return null;
    }
}

module.exports = {
    SalonManager: SalonManager
}