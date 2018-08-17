import { Router } from "express";
import { leadRouter } from "./lead";
import { adsRouter } from "./ads";
import { usaStateRouter } from "./usaStateRouter";

const apiRouter = Router();

apiRouter.use('/lead', leadRouter);
apiRouter.use('/ads', adsRouter);
apiRouter.use('/state', usaStateRouter);
apiRouter.use('/', (req, res) => {
    res.json({error: "You have entered an invalid endpoint"});
});

export { apiRouter };