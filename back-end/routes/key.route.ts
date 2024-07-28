import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware";
import { getKey, createKey, deleteKey, sharingKey } from "../controllers/key.controller";

const router = Router();

router.get("/", [validateToken], getKey);
router.post("/", [validateToken], createKey);
router.delete("/", [validateToken], deleteKey);
router.post("/sharing", [validateToken], sharingKey);

export default router;
