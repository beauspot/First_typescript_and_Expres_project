import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT,
    host: process.env.HOST,
    dbURI: process.env.MONGO_URL
};