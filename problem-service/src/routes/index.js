const v1Router=require("./v1/index");
const express=require("express");

const apiRoute=express.Router();

apiRoute.use('/v1',v1Router);
module.exports=apiRoute;