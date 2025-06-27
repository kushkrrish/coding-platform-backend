import express from "express";

import v1Router from "./v1";
const apirouter=express.Router();
apirouter.use('/v1',v1Router);

export default apirouter;