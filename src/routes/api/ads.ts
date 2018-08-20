import * as express from "express";
import { advertisersAutoLoader } from "../../advertisers";
import { zipCode, leadType } from "../../services/serverValidation";

const adsRouter = express.Router();

adsRouter.get("/", (req, res) => {
    // params are zipCode and type
    if (req.body.hasOwnProperty("zipCode") && req.body.hasOwnProperty("type")) {
        console.log("got past the first check");
        const zip = req.body.zipCode;
        const type = req.body.type;
        if (zipCode(zip) && leadType(type)) {
            console.log(`${zip} is ZIP code`);
            advertisersAutoLoader.getAds(type, zip)
                .then((ads) => {
                    res.json({ads});
                });
        } else {
            res.status(400);
            res.json({message: "Parameters exist but were malformed"});
        }
    } else {
        res.status(400);
        res.json({message: "parameters zipCode and type are required via a JSON request"});
    }

});

export { adsRouter };