import express from "express";
import { deleteVenue, getAllVenue, getVenueById, getVenueByOwnerId, postVenue, updateVenue } from "../controllers/venue.controller";

const router = express.Router();

router.post("/postVenue", postVenue);
router.get("/getAllVenues", getAllVenue);
router.get("/getVenueById/:id", getVenueById);
router.put("/updateVenue/:id/:userId", updateVenue);
router.delete("/deleteVenue/:id/:userId", deleteVenue);
router.get("/getVenueByOwnerId/:id", getVenueByOwnerId);
export default router;
