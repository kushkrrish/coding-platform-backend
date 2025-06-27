const problemRoute=require("./problemRouter");
const express=require("express");

const v1Route=express.Router();

v1Route.use('/problems',problemRoute);

module.exports=v1Route;