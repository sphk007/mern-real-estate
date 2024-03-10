import express from "express";
import { deleteUser, test,updateUser,getListings } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js"
import cookieParser from "cookie-parser";

const router =express.Router();
// router.use(cookieParser())
router.get("/test",test);

router.route("/update/:id").post(verifyToken,updateUser);
router.route("/delete/:id").delete(verifyToken,deleteUser);
router.route("/listings/:id").get(verifyToken,getListings);
export default router;