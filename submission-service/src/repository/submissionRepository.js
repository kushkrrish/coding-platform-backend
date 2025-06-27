// src/repository/submissionRepository.js
const Submission = require("../model/submissionModel"); // Assuming correct path to your Mongoose/Sequelize model

class submissionRepository {
    constructor() {
        this.submiModel = Submission; // Corrected from this.Model to this.submiModel for consistency with your image
    }

    async createSubmission(submission) {
        console.log("from services (repo)", submission); // Added (repo) to distinguish logs

        try {
            const response = await this.submiModel.create(submission);
            console.log("after from repo (success)", response); // Added (success)
            return response;
        } catch (error) {
            console.error("Error in submiModel.create(submission):", error);
            // Check specific error properties:
            if (error.name === 'ValidationError') {
                console.error("Mongoose Validation Error:", error.message, error.errors);
            } else if (error.code === 11000) { // Example for duplicate key error (MongoDB)
                console.error("Duplicate Key Error:", error.message);
            }
            // Re-throw the error so it can be caught by the service layer
            throw new Error(`Failed to create submission in database: ${error.message || 'Unknown database error'}`);
        }
    }
}

module.exports = submissionRepository;