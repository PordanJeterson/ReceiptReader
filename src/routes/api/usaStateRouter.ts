import * as express from "express";
import { getStateByZipCode } from "../../services";

const usaStateRouter = express.Router();

usaStateRouter.get("/:zipCode", (req, res) => {
    // todo hit api to get the zip code
    getStateByZipCode(req.params.zipCode)
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            res.json({message: "an error occurred", error: error});
        });
});

export { usaStateRouter };