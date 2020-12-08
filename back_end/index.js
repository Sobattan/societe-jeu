let {SalonManager} = require('./SalonManager/SalonManager');
console.log("hello");
let salonManager = new SalonManager();
let salonId = salonManager.createNewSalon();
salonManager.joinSalon("Faramyr","id",salonId);
salonManager.joinSalon("Faramyr2","id2",salonId);
console.log(JSON.stringify(salonManager));