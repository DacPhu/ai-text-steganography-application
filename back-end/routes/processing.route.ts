import { Router, Request, Response } from "express";
import { encrypt } from "../controllers/encrypt.controller";
import { decrypt } from "../controllers/decrypt.controller";
const { validateToken } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/encrypt", [validateToken], encrypt);

router.post("/decrypt", [validateToken], decrypt);

export default router;
