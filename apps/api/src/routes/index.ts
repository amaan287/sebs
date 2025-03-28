import express from "express";
import authRoutes from "./auth.route";
import venueRoutes from "./venue.routes";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/venue", venueRoutes);

export default router;
