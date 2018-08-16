// a lot of inspiration for setup taken from https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter

import * as express from "express";
import { Express } from "express";
import * as path from "path";


class App {
    public express: Express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.express.use(
            express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
        );
    }
}

export default new App().express;
export const app = new App().express;