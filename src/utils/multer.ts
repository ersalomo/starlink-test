import multer from "multer";
import {logger} from "./logger";
import path from "path";
import {getFormattedDate} from "./date-formatter";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        logger.info(`Multer [] ${file.fieldname}`)
        // console.log(file)
        if (file.fieldname === "image_url") {
            cb(null, 'public/images')
        }

        else if (file.fieldname === "sample_url") {
            cb(null, 'public/musics');
        }
    },
    filename:(req,file,cb)=>{
        if (file.fieldname === "image_url") {
            cb(null, file.fieldname+ getFormattedDate() + path.extname(file.originalname));
        }
        else if (file.fieldname === "sample_url") {
            cb(null, file.fieldname + getFormattedDate() + path.extname(file.originalname));
        }
    }
});



export const uploadMiddleware = multer({storage}).fields([
    {name: "image_url", maxCount:1 },
    {name: "sample_url", maxCount: 1},
])
