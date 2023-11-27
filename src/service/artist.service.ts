import {Pool} from "pg";
import {pool} from "../config/env";
import {logger} from "../utils/logger";
import {Artist} from "../model/artist";
import ArtistRepo from "./repository/artist.repo";
import NotFoundError from "../exception/not-found";
import PageReq from "../dao/page-req";
import { v4 as uuid } from 'uuid';

export default class ArtistService implements ArtistRepo {

    private _pool: Pool;

    constructor() {
        this._pool = pool;
    }

    async create(artist: Artist): Promise<Artist> {
        const {artist_name, package_name, image_url, release_date, sample_url} = artist;
        const id = uuid()
        const query = {
            text: `INSERT INTO artist(id, artist_name, package_name, image_url, release_date, sample_url)
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [id, artist_name, package_name, image_url, release_date, sample_url],
        }
        const result = await this._pool.query(query);
        logger.info("artis", result.rows[0], id)
        return {...result.rows[0]}
    }


    async delete(id: string): Promise<Artist> {
       await this.find(id);
        const query = {
            text: `DELETE
                   FROM artist
                   WHERE artist.id = $1 RETURNING *`,
            values: [id]
        }
       const result =  await this._pool.query(query);

        return {...result.rows[0]};
    }

    async find(id: string): Promise<Artist> {
        const query = {
            text: `SELECT *
                   FROM artist
                   WHERE artist.id = $1`,
            values: [id]
        };
        const result = await this._pool.query(query);
        logger.info(`fetch ${result.rows}`)
        if (result.rowCount === 0) {
            throw new NotFoundError('Artist not found!');
        }
        return {...result.rows[0]}
    }

    async show(id: string): Promise<Artist> {
        return this.find(id)
    }

    async update(id: string, req: Artist): Promise<Artist> {
        const {artist_name, package_name, image_url, release_date, sample_url} = req;
        const query = {
            text: `UPDATE artist
                   SET artist_name  = $1,
                       package_name = $2,
                       image_url    = $3,
                       release_date = $4,
                       sample_url   = $5
                   WHERE id = $6 RETURNING *`,
            values: [artist_name, package_name, image_url, release_date, sample_url, id],
        };

        const result = await this._pool.query(query);

        if (result.rowCount === 0) {
            throw new Error(`Artist with id ${id} not found.`);
        }
        logger.info("Updated artist:", result.rows[0]);
        return {...result.rows[0]};
    }

    async findAll(req: PageReq): Promise<Artist[]> {
        const offset = (req.page - 1) * req.size;
        const query = {
            text: `SELECT *
                   FROM artist OFFSET $1 LIMIT $2`,
            values: [offset, req.size]
        }
        const result = await this._pool.query(query);
        return result.rows
    }


}