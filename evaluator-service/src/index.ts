import  express ,{ Express } from "express";
import serverConfig from "./config/serverConfig";
import bodyParser from "body-parser";
import apirouter from "./router";


import submissionWorker from "./consumer/submissionWorker";
//import pythonExecutor from "./containes/pythonExecutor";


const app : Express=express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());
//  const code = `
// x = input()
// y = input()
// print("value of x is", x)
// print("value of y is", y)
// `;

// const inputCase =  '100\n200';

  


app.use('/',apirouter);
app.listen(serverConfig.PORT,()=>{
    console.log("server started");

    submissionWorker("submissionQueue");
   
})