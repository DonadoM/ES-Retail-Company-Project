// import express from "express";
// import {
//   authUser,
//   registerUser,
//   getUserProfile,
//   updateUserProfile,
//   getUsers,
//   deleteUser,
//   getUserById,
//   updateUser,
//   makeAdmin,
// // } from "../controllers/userController";
// import { protect, admin } from "../middlewares/authMiddleware";

// const router = express.Router();

// router.put("/make-admin/:id", protect, admin, makeAdmin);

// router.post("/register", registerUser);
// router.route("/").post(registerUser).get(protect, admin, getUsers);
// router.post("/login", authUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);

// export default router;
