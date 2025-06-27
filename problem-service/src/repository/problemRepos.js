const notFound = require("../errors/notFound.error");
const { Problem}=require("../models");
const logger = require('../config/logger.config');


 class problemRepository{
    async createProblem(problemData){
        try {
            const problem=Problem.create({
                title:problemData.title,
                description:problemData.description,
                codeStubs:problemData.codeStubs,
                testCases:(problemData.testCases)?problemData.testCases:[]
            });
            return problem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async  getProblems() {
        try {
            const problems=await Problem.find({});
            return problems;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getProblem(id){
       try {
        
         const problem=await Problem.findById(id);
        if(!problem){
            // logger.error(`Problem.Repository: Problem with id: ${id} not found in the db`);
            throw new notFound('problem',id);
            
        }
        return problem;
       } catch (error) {
        
        throw error;
       }
    }
    async deleteProblem(id){
        try {
             const problem = await Problem.findByIdAndDelete(id);
            if(!problem) {
                 logger.error(`Problem.Repository: Problem with id: ${id} not found in the db`);
                throw new notFound("problem", id);
            }
            return problem;
        } catch (error) {
            
            throw error;
        }
    }
 }
 module.exports=problemRepository;
