import * as express from "express";
import { LeadInterface } from "../../interfaces";
import { validate, saveLead, getLeads } from "../../services";

const leadRouter = express.Router();

leadRouter.get("/", (req, res) => {
    res.json({message: "you must post to this endpoint"});
});
leadRouter.post("/", (req, res) => {
    const lead = req.body as LeadInterface;
    if (validate(lead)) {
        saveLead(req.body);
        res.json({message: "lead posted!", success: true});
    } else {
        res.json({message: "There was a problem", error: `lead with data ${req.params} did not post`});
    }
});
leadRouter.get("/list", (req, res) => {
    // todo make this get list of all leads from database

    // typescript doesn't have up to date types for node-persist!
    // @ts-ignore
    getLeads().then((leads) => {
        res.json({leads: leads});
    }).catch((error: any) => {
        res.json({error: "an error occurred when retrieving leads"});
    });

});

export { leadRouter };