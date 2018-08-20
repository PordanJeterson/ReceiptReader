// a lot of inspiration for setup taken from https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter

import * as express from "express";
import * as storage from "node-persist";
import { Express } from "express";
import * as bodyParser from "body-parser";

import { apiRouter } from "./routes/api";
import * as path from "path";

class App {
    public app: Express;

    constructor() {
        // this is just easier for a small project
        storage.init({
            dir: path.resolve(__dirname, "datastore")
        });
        this.app = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.app.use(bodyParser.json());
        this.app.use("/api", apiRouter);
        this.app.use(
            express.static(path.join(__dirname, "public"), {maxAge: 31557600000})
        );
        // allows us to use react's router
        this.app.get("*", function (request, response) {
            response.sendFile(path.resolve(__dirname, "public", "index.html"));
        });
    }
}

export const app = new App().app;