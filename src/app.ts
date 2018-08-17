// a lot of inspiration for setup taken from https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter

import * as express from "express";
import { Express } from "express";
import { apiController } from './controllers';
import * as path from "path";


class App {
    public express: Express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.express.get("/api", apiController);
        this.express.use(
            express.static(path.join(__dirname, "public"), {maxAge: 31557600000})
        );
    }
}

export const app = new App().express;