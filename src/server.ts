import express, {Application, Response, Request, NextFunction} from "express";
import {logger} from "./utils/logger";
import bodyParser from "body-parser";
import cors from "cors"
import "dotenv/config"
import routes from "./route";
import * as path from "path";
import "./config/env"
import ClientError from "./exception/client-error";
import multer from "multer";



process.on("uncaughtException", e => logger.error(`uncaughtException ${e}`))

export default function (): Application {
    const app: Application = express();

    app.use(express.json({limit: '10mb'}))

    app.use(bodyParser.urlencoded({
        limit: '10mb',
        extended: false,
        parameterLimit: 5000
    }))
    app.use(bodyParser.json())
    app.use(express.static(path.join(__dirname, 'public')))
    // cors access handler
    app.use(cors())
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        next()
    });
    /*
    * set routes to app
    * */
    routes(app)

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            logger.error(`"[Error server file line:55]", ${err.message}`);
        if (err instanceof ClientError) {
            logger.error("[CE2]", err.message);
            return res.send(err.code).send({
                status: "fail",
                message: err.message,
                code: err.code
            })
        }
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    })
    return app;
}