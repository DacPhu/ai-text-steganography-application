import { Router, Request, Response } from "express";
import { encrypt } from "../controllers/encrypt.controller";
import { decrypt } from "../controllers/decrypt.controller";
import { validateToken } from "../middlewares/auth.middleware";
import multer from "multer";

const upload = multer();
const router = Router();

router.post("/encrypt", [validateToken, upload.none()], encrypt);

router.post("/decrypt", [validateToken, upload.none()], decrypt);

export default router;
