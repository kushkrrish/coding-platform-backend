const dotenv=require('dotenv');
dotenv.config();
module.exports={
    PORT:process.env.PORT,
    REDIS_PORT: process.env.REDIS_PORT || "6379",
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    ATLAS_DB_URL:process.env.ATLAS_DB_URL,
    NODE_DEV:process.env.NODE_DEV,
    PROBLEM_ADMIN_SERVICE_URL:process.env.PROBLEM_ADMIN_SERVICE_URL
}