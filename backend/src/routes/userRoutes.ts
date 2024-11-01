import { Router } from "express";
import { registerUser, loginUser, getUsers, updateUser, deleteUser } from "../controllers/userController";
import { protect, admin } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Rutas protegidas
router.get("/", protect, admin, getUsers);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
