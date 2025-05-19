import { Router } from "express";
import { login, logout, signUp } from "../controller/authController.js";
import { limiter } from "../config/config.js";

const authRouter = Router()

authRouter.post("/sign-up", signUp)

authRouter.post("/login", limiter, login)

authRouter.post("/logout", logout)

export default authRouter;