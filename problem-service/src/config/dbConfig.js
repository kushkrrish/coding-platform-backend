const mongoose=require("mongoose");
const{NODE_ENV, ATLAS_DB_URL}=require("./serverConfig");

async function connectToDb() {
    try{
        if(NODE_ENV=="development"){
            await mongoose.connect(ATLAS_DB_URL);
            //await mongoose.connect(LOGGER_DB_URL);
        }
    }
    catch(error){
        console.log("not connected to db");
        console.log(error);
    }
}
module.exports=connectToDb;