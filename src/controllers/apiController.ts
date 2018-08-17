import { Request, Response, NextFunction } from "express";

export const apiController = (req: Request, res: Response, next: NextFunction) => {
    res.json({message: "Great work!"});
};

export default apiController;