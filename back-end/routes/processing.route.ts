import { Router, Request, Response } from "express";
import { encrypt } from "../controllers/encrypt.controller";
import { decrypt } from "../controllers/decrypt.controller";
const router = Router();

router.post("/encrypt", encrypt);

router.post("/decrypt", decrypt);

export default router;
