import * as express from "express";
import * as fs from 'fs';

const leadRouter = express.Router();

leadRouter.get("/", (req, res) => {
    res.json({message: "you must post to this endpoint"});
});
leadRouter.post("/", (req, res) => {
    // todo post lead to db
    console.log(req);
    res.json({message: "lead posted"});
});
leadRouter.get("/list", (req, res) => {
    // todo make this get list of all leads from database
    res.json({message: "sending list of leads"});
});

export { leadRouter };