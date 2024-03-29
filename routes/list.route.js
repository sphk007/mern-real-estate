import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createlist,deleteListing,updateListing,getListing,getListings } from "../controllers/list.controller.js";
const router =express.Router();

router.route('/create').post(verifyToken,createlist);
router.route('/delete/:id').delete(verifyToken,deleteListing);
router.route('/update/:id').post(verifyToken,updateListing);
router.route('/get/:id').get(getListing);
router.route('/get').get(getListings);
export default router;