let {SalonManager} = require('./SalonManager/SalonManager');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let salonManager = new SalonManager();
/*let salonId = salonManager.createNewSalon();
salonManager.joinSalon("Faramyr","socket.id","socket",salonId);
salonManager.joinSalon("Faramyr","socket.id", "socket",salonId);
salonManager.joinSalon("Faramyr2","id2", "socket",salonId);
salonManager.getSalon(salonId);
console.log(JSON.stringify(salonManager));
salonManager.leaveSalon("id",salonId);
console.log(JSON.stringify(salonManager));
salonManager.leaveSalon("id2",salonId);
console.log(JSON.stringify(salonManager));*/

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/salons', function (req, res) {
    let data = salonManager.salonList.map(ele=>{return {idSalon : ele.getId(), nbPlayer : ele.getPlayerCount(), nbMaxPlayer : ele.getMaxPlayer()};});
    res.status(200).json({salonList : data});
});

app.post('/salon', function (req, res) {
    let idSalon = salonManager.createNewSalon();
    console.log(idSalon);
    res.status(200).json({idSalon: idSalon});
});

io.on('connection',socket => {
    socket.on('joinSalon',(pseudo,idSalon)=>{
        let hasJoin = salonManager.joinSalon(pseudo,socket.id,socket,idSalon);
        if(hasJoin){
            socket.emit("joined");
            socket.on('sendMsg', (msg) => {
                salonManager.getSalon(idSalon).sendMessage(socket.id,msg);
            })
            socket.on('leaveSalon', () =>{
                salonManager.leaveSalon(socket.id,idSalon);
            })
            socket.on('disconnect', () =>{
                salonManager.leaveSalon(socket.id,idSalon);
            })
        }
        else{
            socket.emit("cantjoin");
        }
    })
})


http.listen(8080, function () { });