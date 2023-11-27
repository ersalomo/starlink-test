import fs from "fs"
import {logger} from "../../utils/logger";

export default class StorageService {

    constructor(private _folder: string) {

        if (!fs.existsSync(this._folder)) {
            fs.mkdirSync(_folder, {recursive: true})
        }
    }

    public writeFile(file:any, meta:any) {
        const filename = +new Date() + meta.filename;
        const path = `${this._folder}/${filename}`;

        const fileStream = fs.createWriteStream(path);

        return new Promise((resolve, reject) => {
            fileStream.on("error", err => reject(err))
            file.pipe(fileStream)
            file.on("end", () => resolve(filename))
        })
    }

    public async deleteFile(filename:string) {
        const oldData = `${this._folder}/${filename}`
        fs.unlink(oldData, (err) => {
            if (err){
                logger.error(`Error Storage service ${err}`)
            }else
                logger.error(`Storage service data deleted ${err}`)

        })
    }
}