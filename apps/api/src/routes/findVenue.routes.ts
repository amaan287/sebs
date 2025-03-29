import express from "express";
import { findNearbyVenueByType, findVenue } from "../controllers/findVenue";

const router = express.Router();

router.post("/", findVenue);
router.post("/byType", findNearbyVenueByType);
export default router; 