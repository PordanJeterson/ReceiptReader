import { Router } from "express";
import { reportRouter } from "./report";
import { receiptRouter } from "./receiptRouter";

const apiRouter = Router();

apiRouter.use("/report", reportRouter);
apiRouter.use("/receipt", receiptRouter);
apiRouter.use("/", (req, res) => {
    res.json({error: "You have entered an invalid endpoint"});
});

export { apiRouter };