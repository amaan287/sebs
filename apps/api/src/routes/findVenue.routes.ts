import express from "express";
import { findVenue } from "../controllers/findVenue";

const router = express.Router();

router.post("/", findVenue);

export default router; 