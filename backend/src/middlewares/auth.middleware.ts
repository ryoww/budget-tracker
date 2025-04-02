import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../lib/sendResponse";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return sendErrorResponse(res, "TOKEN_NOT_FOUND");
    }
};
