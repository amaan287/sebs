import express from "express";
import { getAllVenue, postVenue } from "../controllers/venue.controller";

const router = express.Router();

router.post("/postVenue", postVenue);
router.get("/getAllVenues", getAllVenue);

export default router;
