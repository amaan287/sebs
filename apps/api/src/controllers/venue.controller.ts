import LocationService from "../LocationService/HelperService";
import { postVenueSchema } from "../types";
import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
const prisma: PrismaClient = new PrismaClient();
export const postVenue:RequestHandler = async (req, res) => {
  const parsedData = postVenueSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log("error", parsedData.error);
    res.status(400).json({
      data: {
        message: "Validation failed",
      },
    });
    return;
  }

  const owner = await prisma.user.findUnique({
    where: { id: parsedData.data.ownerId },
  });

  if (!owner) {
    res.status(404).json({
      data: {
        message: "Owner not found",
      },
    });
    return;
  }

  if (!owner.admin) {
    res.status(400).json({
      data: {
        message: "Account type is not admin, please create an owner's account",
      },
    });
    return;
  }

  const locationService = new LocationService(prisma);
  const newVenue = await locationService.createVenueWithLocation({
    name: parsedData.data.name,
    type: parsedData.data.type,
    address: parsedData.data.address,
    latitude: parsedData.data.latitude,
    longitude: parsedData.data.longitude,
    city: parsedData.data.city,
    country: parsedData.data.country,
    owner: {
      connect: { id: parsedData.data.ownerId }
    }
  });

  res.status(200).json({
    data: {
      message: "Venue created successfully",
      newVenue,
    },
  });
}
export const  getAllVenue:RequestHandler = async (req, res) => {
  try {
    const venue = await prisma.venue.findMany({
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            admin: true,
          },
        },
      },
    });
    if (!venue) {
      res.status(400).json({
        data: {
          message: "no venues",
        },
      });
      return;
    }
    res.status(200).json({
      data: {
        venue: venue,
      },
    });
  } catch (e) {
    res.status(500).json({
      data: {
        message: "Internal server error",
      },
    });
    return;
  }
}
