import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware";
import {
  getKey,
  createKey,
  deleteKey,
  sharingKey,
  getKeysSharing,
  deleteKeySharing,
  getKeysShared,
  deleteKeyShared,
} from "../controllers/key.controller";

const router = Router();

router.get("/", [validateToken], getKey);
router.post("/", [validateToken], createKey);
router.delete("/", [validateToken], deleteKey);

router.post("/sharing", [validateToken], sharingKey);
router.get("/sharing", [validateToken], getKeysSharing);
router.delete("/sharing", [validateToken], deleteKeySharing);

router.get("/shared", [validateToken], getKeysShared);
router.delete("/shared", [validateToken], deleteKeyShared);

export default router;
