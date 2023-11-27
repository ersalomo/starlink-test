import {Router, Application} from "express";
import {ArtistRoute} from "./artist.route";
import {logger} from "../utils/logger";


type  Route = [string, Router];


const _routes: Array<Route> = [
    ["/artists", ArtistRoute]
];

const routes = (app: Application)=> {
    _routes.forEach((route: Route) => {
        const [url, router] = route;
        logger.info("calling url :", url)
        app.use(url, router)
    })
}

export default routes;