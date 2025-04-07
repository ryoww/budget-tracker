import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import recordService from "../services/record/record.service";

const recordRouter = Router();

recordRouter.post("/createReceipt", authMiddleware, recordService.createReceipt);

recordRouter.put("/updateReceipt", authMiddleware, recordService.updateRecord);

export default recordRouter;
