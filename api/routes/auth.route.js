import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { signin } from "../controllers/auth.controller.js";

const router = express.Router();

router
    .route('/signup')
    .post(signup)
// router
// .route('/')    
// .post("signup",signup);

router.route('/signin').post(signin);

export default router;