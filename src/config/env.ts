import {ClientConfig, Pool} from "pg";
import config from "../../config/db/config.json";
import {logger} from "../utils/logger";

// const db = {
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     database: process.env.PG_DB
// };
const db2 = {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
};
export const pool = process.env.NODE_ENV === 'dev' ? new Pool(db2 as ClientConfig) : new Pool();