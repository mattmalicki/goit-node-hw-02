import { Router } from "express";
import "../../auth/services/auth.strategy.js";
import auth from "../../auth/middlewares/auth.js";
import { uploadMiddleware } from "../middlewares/avatar.js";
import { updateUser, updateAvatar } from "../controllers/update.js";
import {
  verifyToken,
  verificationEmailRequest,
} from "../controllers/verify.js";

const router = Router();

router.patch("/", auth, updateUser);
router.patch("/avatars", auth, uploadMiddleware.single("avatar"), updateAvatar);
router.post("/verify", verificationEmailRequest);
router.get("/verify/:verificationToken", verifyToken);

export default router;
