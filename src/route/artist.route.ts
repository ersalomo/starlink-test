import {Router} from "express";
import ArtistController from "../controller/artist.controller";
import {uploadMiddleware} from "../utils/multer";

export const ArtistRoute = Router();

const artistController = new ArtistController();

ArtistRoute.get("/", artistController.findAll)
ArtistRoute.get("/index", artistController.indexArtist)
ArtistRoute.get("/:id/detail", artistController.findArtistById)
ArtistRoute.get("/files/:image_path", artistController.getHandleImage)
ArtistRoute.put("/:id", uploadMiddleware,artistController.handleUpdate)
ArtistRoute.delete("/:id", artistController.handleDelete)
ArtistRoute.post("/create", uploadMiddleware, artistController.uploadFileHandler)
