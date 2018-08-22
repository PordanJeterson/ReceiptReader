import * as express from "express";
import { saveReceipt, getReceipts } from "../../services";

const reportRouter = express.Router();

reportRouter.get("/", (req, res) => {
    // todo implement get behavior for report
    res.json({message: "get report"});
});

reportRouter.get("/list", (req, res) => {
    // todo make this get list of all leads from database

    // typescript doesn't have up to date types for node-persist!
    // @ts-ignore
    getReceipts().then((leads) => {
        res.json({leads: leads});
    }).catch((error: any) => {
        res.json({error: "an error occurred when retrieving reports"});
    });

});

export { reportRouter };