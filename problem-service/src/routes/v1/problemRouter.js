const {problem_controller}=require("../../controller");

const express=require("express");
const problemRoute=express.Router();

problemRoute.get('/',problem_controller.getProblems);
problemRoute.get('/:id',problem_controller.getProblem);
problemRoute.post('/',problem_controller.addproblem);
problemRoute.delete('/:id',problem_controller.deleteProblem);
problemRoute.get('/ping',problem_controller.pingCheck);

module.exports=problemRoute;