import { Router } from "express";

const authRouter = Router()

authRouter.post("/sign-up", (req, res) => {
    res.send('sign-up successful');
})

authRouter.post("/login", (req, res) => {
    res.send('login successful');
})

authRouter.post("/logout", (req, res) => {
    res.send('logout successful');
})

export default authRouter;