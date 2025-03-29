import express from "express";
import authRoutes from "./auth.route";
import venueRoutes from "./venue.routes";
import findVenueRoutes from "./findVenue.routes";
import eventRoutes from "./event.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/venue", venueRoutes);
router.use("/findVenue", findVenueRoutes);
router.use("/event", eventRoutes);
export default router;
