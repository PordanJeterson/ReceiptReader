import * as express from "express";

const receiptRouter = express.Router();

receiptRouter.get("/", (req, res) => {
    res.json({message: "received"});

});

export { receiptRouter };