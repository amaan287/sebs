import { Prisma, PrismaClient } from "@prisma/client";
import LocationService from "../LocationService/HelperService";
import { findVenueByTypeSchema, findVenueSchema } from "../types";
import { RequestHandler } from "express";

const prisma:PrismaClient = new PrismaClient();

export const findVenue: RequestHandler = async (req, res) => {
    const parsedData = findVenueSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            data: { message: "Invalid coordinates" }
        });
        return;
    }
    try {
        const locationService = new LocationService(prisma);
        const venues = await locationService.findNearbyVenues(
            parsedData.data.latitude,
            parsedData.data.longitude,
            parsedData.data.radius
        );
        res.status(200).json({
            data: venues
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: { message: "Internal server error",error:error }
        });
    }
}

export const findNearbyVenueByType: RequestHandler = async (req, res) => {
    const parsedData = findVenueByTypeSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            data: { message: "Invalid coordinates" }
        });
        return;
    }
    try {
        const locationService = new LocationService(prisma);
        const venues = await locationService.findNearbyVenueByType(
            parsedData.data.type,
            parsedData.data.latitude,
            parsedData.data.longitude,
            parsedData.data.radius
        );
        res.status(200).json({
            data: venues
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: { message: "Internal server error",error:error }
        });
    }
}
