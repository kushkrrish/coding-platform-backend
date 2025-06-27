import { Queue } from "bullmq";
import rediConnection from "../config/redisConfig";

export default new Queue("evaluationQueue",{ connection: rediConnection});