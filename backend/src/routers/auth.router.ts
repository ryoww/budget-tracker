import { Router } from "express";
import authService from "../services/auth.service";

const authRouter = Router();

authRouter.post("/register", authService.register);

authRouter.post("/login", authService.login);

export default authRouter;
