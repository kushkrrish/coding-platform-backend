import { Request, Response } from "express";

import { CreateSubmissionDto } from "../dtos/createSubmissiondto";

export async function addSubmission(req:Request,res:Response) {
    const submissionTodo=req.body as CreateSubmissionDto;
    console.log(submissionTodo);

     res.status(201).json({
        success: true,
        error: {},
        message: 'Successfully collected the submission',
        data: submissionTodo
    });
}