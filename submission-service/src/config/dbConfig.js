const mongoose = require('mongoose');
const { ATLAS_DB_URL, NODE_DEV } = require('./serverCOnfig');


async function connectToDB() {

    try {
        if(NODE_DEV == "development") {
            await mongoose.connect(ATLAS_DB_URL);
        } 
    } catch(error) {
        console.log('Unable to connect to the DB server');
        console.log(error);
    }

}

module.exports = connectToDB;