const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const {PORT}=require("./config/serverConfig");
const apiRouter=require("./routes/index");
const errorHandler = require("./utils/errorrHandler");
const connectToDb = require("./config/dbConfig");

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
app.use('/api',apiRouter);
//its an error handel middelware which is placed always afte all calls
// its bascialyy alast middelware
app.use(errorHandler);
app.listen(PORT,async()=>{
    console.log(`server is started at ${PORT} `);
    await connectToDb();
    console.log("successful connect to db")
})
