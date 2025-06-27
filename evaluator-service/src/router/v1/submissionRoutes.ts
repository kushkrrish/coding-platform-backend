import express from "express";

import { addSubmission } from "../../controller/submissionController";

import { createSubmissionZodSchema } from "../../dtos/createSubmissiondto";
import { validate } from "../../validator/createSubmissionValidator";

const submissionRouter=express.Router();

submissionRouter.post('/',
    validate(createSubmissionZodSchema)
    ,addSubmission);

export default submissionRouter;