import { Router } from "express";
import multer from "multer";
import receiptService from "../services/receipt/receipt.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const receiptRouter = Router();
const upload = multer({ dest: "uploads/" });

receiptRouter.post(
    "/parse",
    authMiddleware,
    upload.single("receipt"),
    receiptService.parseReceipt
);

export default receiptRouter;
