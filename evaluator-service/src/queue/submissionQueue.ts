import { Queue } from "bullmq";
import rediConnection from "../config/redisConfig";

export default new Queue("submissionQueue",{ connection: rediConnection});