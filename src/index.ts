import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source"
import { AppRoutes } from "./route";
import {Request, Response} from "express";


AppDataSource.initialize().then(async () => {
    console.log("db connected")

     // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}))

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(3000)

 
}).catch(error => console.log("TypeORM connection error: ", error));
