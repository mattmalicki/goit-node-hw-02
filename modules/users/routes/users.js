import { Router } from "express";
import "../../auth/services/auth.strategy.js";
import auth from "../../auth/middlewares/auth.js";
import { verifyToken } from "../controllers/verify.js";
import { uploadMiddleware } from "../middlewares/avatar.js";
import { updateUser, updateAvatar } from "../controllers/update.js";

const router = Router();

router.patch("/", auth, updateUser);
router.patch("/avatars", auth, uploadMiddleware.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verifyToken);

export default router;
