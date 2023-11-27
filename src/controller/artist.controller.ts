import {Request, Response} from "express";
import * as path from "path";
import ArtistService from "../service/artist.service";
import ArtistRepo from "../service/repository/artist.repo";
import {logger} from "../utils/logger";
import PageReq from "../dao/page-req";
import StorageService from "../service/storage/storage.service";
import {Artist} from "../model/artist";


export default class ArtistController {
    private _artistService: ArtistRepo;
    private _storageService: StorageService;

    constructor() {
        this._artistService = new ArtistService();
        this._storageService = new StorageService('public')

    }

    async indexArtist(req: Request, res: Response) {
        return res.sendFile("index.html", {
            root: path.join("public"),
        })
    }

    public findArtistById =async (req: Request, res: Response) => {
        const {id} = req.params
        const artist = await this._artistService.find(id);
        logger.info(id)
        return res.status(200).send({
            status: "success",
            code: 200,
            data: {artist}
        });
    }

    public uploadFileHandler = async (req: Request, res: Response) => {
        for (const [key, val] of Object.entries(req.body)) {
            // @ts-ignore
            if (val === "") {
                return res.status(400).send({
                    status: "fail",
                    message: key.replace("_", " ") + " is required",
                });
            }
        }


        // @ts-ignore
        const {image_url, sample_url} = req.files;
        if (!req.files) {
            return res.status(400).send({
                status: "fail",
                message: "file is selected null.",
            });
        }

        if (!sample_url) {
            return res.status(400).send({
                status: "fail",
                message: "Sample url file is selected null.",
            });
        }
        const payload = req.body;
        const artistReq: Artist = {
            artist_name: payload.artist_name,
            package_name: payload.package_name,
            image_url: image_url ? image_url[0]?.filename : "",
            sample_url: sample_url[0].filename,
            release_date: new Date(payload.release_date).toISOString()
        }

        const artist = await this._artistService.create(artistReq);
        return res.status(200).send({
            status: false,
            message: "Data artist create successfully",
            data: {artist},
        });


    }


    public findAll = async (req: Request, res: Response) => {
        const pageReq = new PageReq()
        pageReq.page = parseInt(((req.query.page) as string) || "1")
        pageReq.size = parseInt(((req.query.size) as string) || "20")
        logger.info("Calling... page, size" + " " + pageReq.page + " " + pageReq.size)
        return res.status(200).send({
            status: "success",
            code: 200,
            data: await this._artistService.findAll(pageReq)
        })
    }

    public getHandleImage = async (req: Request, res: Response) => {
        const {image_path } = req.params;
        const [folder_name, filename] = image_path.split("-")
        return res.sendFile(filename == "" ? "image_url_default_img.jpg": filename, {
            root: path.join(`public/${folder_name}`),
        })
    }

    public handleUpdate = async (req: Request, res: Response) => {
        const {id} = req.params
        const artistDb = await this._artistService.find(id);

        if (!req.files) {
            return res.status(400).send({
                status: "fail",
                message: "Sample url file is selected.",
            });
        }
        // @ts-ignore
        let {image_url, sample_url} = req.files;

        if (image_url === undefined) {
            image_url = artistDb.image_url
        }else {
            image_url = image_url[0].filename;
            await this._storageService.deleteFile("images/" + artistDb.image_url)
        }

        if (sample_url === undefined) {
            sample_url = artistDb.sample_url;
        }else {
            sample_url = sample_url[0].filename;
            await this._storageService.deleteFile("musics/"+artistDb.sample_url)
        }

        const payload = req.body;
        const artistReq: Artist = {
            artist_name: payload.artist_name,
            package_name: payload.package_name,
            image_url: image_url ,
            sample_url: sample_url,
            release_date: new Date(payload.release_date).toISOString()
        }
        const artist = await this._artistService.update(id, artistReq)
        return res.status(200).send({
            status: "success",
            code: 200,
            message: "Data artist updated",
            data: {
                artist
            }
        })
    }
    public handleDelete = async (req: Request, res: Response) => {
        const {id} = req.params;
        const {image_url, sample_url} =  await this._artistService.delete(id);
        await this._storageService.deleteFile("images/"+image_url)
        await this._storageService.deleteFile("musics/"+sample_url)
        return res.status(200).send({
            status: "success",
            code: 200,
            message: "Data artist deleted"
        })
    }

}
