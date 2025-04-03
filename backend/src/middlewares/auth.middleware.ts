import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../lib/sendResponse";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

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

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return sendErrorResponse(res, "INVALID_CREDENTIAL");
    }
};
