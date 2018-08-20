import * as express from "express";
import * as bodyParser from "body-parser";
import {advertisersAutoLoader} from "../../advertisers";

const adsRouter = express.Router();

adsRouter.get("/", (req, res) => {
    // params are zipCode and type
    req.params;

    // todo make this return a list of ads sorted based on bid
    // todo make this able to easily add more sources of data, decoupled from shape
    res.json({message: "send ads"});
});

export { adsRouter };