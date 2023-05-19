import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import lodash from "lodash";
import mongoSanitize from "express-mongo-sanitize";
import { StatusCodes } from "http-status-codes";
import MongodbSession from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import session from "express-session";
import logger from "morgan";
// import xssClean from "xss-clean";

dotenv.config({path: __dirname+"/.env"});

const port = process.env.PORT || 2000;

const app = express();
const MongoDBStore = MongodbSession(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_URL as string,
    collection: "sessions",
    ttl: 60 * 60,
});

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV !== "development") app.use(morgan("dev"));
app.use(
  session({
    resave: false,
    secret: process.env.SESSION_SECRET_KEY as string,
    saveUninitialized: false,
    store: store,
    cookie: {
      sameSite: "strict",
      secure: false, // use true if using https
      maxAge: 1000 * 60 * 60, // cookie would expire in 1 hour
    },
  })
);





app.listen(port, () => {
  console.log(`Server listing at http://localhost:${port}`);
});
