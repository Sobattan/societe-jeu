class Game{
    constructor(nbPlayerMax = 2){
        console.log(nbPlayerMax);
        this.nbPlayerMax = nbPlayerMax;
        this.players = [];
    }

    initEvent(socket){
        socket.emit('inscription',socket.id);
        console.log("permet d'initialiser tous les events propres à chaque jeu. Chaque jeu devra réécrire cette fonction");
    }

    addPlayer(id, pseudo, socket){
        //On recherche si il n'y a pas une place vacante parmi les places déjà créées
        console.log("début Game.addPlayer");
        console.log(this.players);
        console.log(this.players.filter(ele=>ele.id==undefined).length);
        if(this.players.filter(ele=>ele.id==undefined).length > 0){
            let index = this.players.findIndex(ele=>ele.id==undefined);
            this.players[index].id=id;
            this.players[index].socket=socket;
            this.players[index].pseudo=pseudo;
        }
        //sinon on ajoute nouveau joueur si il reste de la place
        else if(this.players.filter(ele=>ele.id!=undefined).length < this.nbPlayerMax){
            this.players.push({position : this.players.length+1,id : id, socket : socket, pseudo:pseudo});
        }
        console.log(this.players);
        console.log("Fin Game.addPlayer");
    }

    removePlayer(idPlayer){
        console.log("Remove player");
        console.log(this.players.length);
        this.players = this.players.map(ele=>{
            if(ele.id === idPlayer){
                ele.id=undefined;
                ele.socket=undefined;
                ele.pseudo=undefined;
            }
            return ele;
        });
        console.log(this.players.length);
        console.log(this.players);
        console.log("Fin remove player");
    }

    getMaxPlayer(){
        return this.nbPlayerMax;
    }
}

module.exports = {
    Game: Game
}