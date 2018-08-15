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
        const router = express.Router();
/*        router.get("/", (req, res) => {
            res.json({
                message: "Hello World!"
            });
        });*/
        this.express.use(
            express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
        );

    }
}

export default new App().express;
export const app = new App().express;