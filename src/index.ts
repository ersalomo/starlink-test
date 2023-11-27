import createServer from "./server"
import {logger} from "./utils/logger";
import {generateArtistArray} from "../seeder";
import multer from "multer";




const app = createServer()
const port: number = 3000;


app.listen(port, ()=> {
    // generateArtistArray().then((res)=> {
    //     logger.info('seeder',)
    // });
    logger.info(`Server is running on http://localhost:${port}`)
}).on("error", (e:any) => logger.error(`[Error] : ${e}`));


