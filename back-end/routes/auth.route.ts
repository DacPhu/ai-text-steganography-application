import { Router, Request, Response } from "express";
import { signup, login, logout } from "../controllers/auth.controller";
import { validateToken } from "../middlewares/auth.middleware";
import {
  signupScheme,
  loginScheme,
} from "../middlewares/validators/auth.validator";

const router = Router();

router.post("/signup", signupScheme, signup);

router.post("/login", loginScheme, login);

router.post("/logout", [validateToken], logout);

router.post("/auth", [validateToken], (req: Request, res: Response) => {
  res.status(200).json({
    message: "This user is authenticated",
  });
});

export default router;
