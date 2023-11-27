import {Artist} from "../../model/artist";
import PageReq from "../../dao/page-req";

export default interface ArtistRepo {
    findAll(req: PageReq): Promise<Artist[]>
    create(artist: Artist): Promise<Artist>
    update(id:string,artist: Artist): Promise<Artist>
    delete(id: string): Promise<Artist>
    find(id: string): Promise<Artist>
    show(id: string): Promise<Artist>
}