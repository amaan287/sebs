import express from "express";
import { createEvent, getEvents, getNearbyEvents, getNearbyEventsByType, getEventById, deleteEvent, updateEvent, getEventsByVenueId } from "../controllers/event.controller";

const router = express.Router();

router.post("/create", createEvent);
router.get("/", getEvents);
router.get("/nearby", getNearbyEvents);
router.get("/nearby/:type", getNearbyEventsByType);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent); 
router.get("/venue/:id", getEventsByVenueId);  

export default router;
