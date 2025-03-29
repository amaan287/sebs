import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { createEventSchema, updateEventSchema } from "../types";
import LocationService from "../LocationService/HelperService";

const prisma = new PrismaClient();

export const createEvent: RequestHandler = async (req, res) => {
  const parsedData = createEventSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: parsedData.error.errors,
    });
    return;
  }
  if (!parsedData.data) {
    res.status(400).json({
      message: "Data is required",
    });
    return;
  }
  if (!parsedData.data.userId) {
    res.status(400).json({
      message: "User ID is required",
    });
    return;
  }
  if (!parsedData.data.venueId) {
    res.status(400).json({
      message: "Venue ID is required",
    });
    return;
  }

  // Check if the venue exists and get its owner
  const venue = await prisma.venue.findUnique({
    where: { id: parsedData.data.venueId },
    select: { ownerId: true }
  });

  if (!venue) {
    res.status(404).json({
      message: "Venue not found",
    });
    return;
  }

  // Check if the user is the owner of the venue
  if (venue.ownerId !== parsedData.data.userId) {
    res.status(403).json({
      message: "Only the venue owner can create events",
    });
    return;
  }

  try {
    const event = await prisma.event.create({
      data: {
        name: parsedData.data.name,
        date: parsedData.data.date,
        genre: parsedData.data.genre,
        performer: parsedData.data.performer.join(", "),
        venue: {
          connect: { id: parsedData.data.venueId },
        },
        
      },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getEvents: RequestHandler = async (req, res) => {
try {
  const events = await prisma.event.findMany();
  res.status(200).json(events);
} catch (error) {
  res.status(500).json({
    message: "Internal server error",
  });
}

};
export const getNearbyEvents: RequestHandler = async (req, res) => {
  const { latitude, longitude, radiusInMeters } = req.body;
  const locationService = new LocationService(prisma);
  const events = await locationService.findNearbyEvents(latitude, longitude, radiusInMeters);
  res.status(200).json(events);
}
export const getNearbyEventsByType: RequestHandler = async (req, res) => {
  const { latitude, longitude, radiusInMeters, type } = req.body;
  const locationService = new LocationService(prisma);
  const events = await locationService.findNearbyEventsByType(latitude, longitude, radiusInMeters, type);
  res.status(200).json(events);
}
export const getEventById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const event = await prisma.event.findUnique({
    where: { id },
  });
  res.status(200).json(event);
}
export const updateEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const parsedData = updateEventSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "Invalid data",
        errors: parsedData.error.errors,
      });
      return;
    }
    if(!parsedData.data) {
      res.status(400).json({
        message: "Data is required",
      });
      return;
    }
   
    if(!userId) {
      res.status(400).json({
        message: "User ID is required",
      });
      return;
    }
    const oldEvent = await prisma.event.findUnique({
    where: { id },
    select: {
      venue: {
        select: {
          ownerId: true,
        },
      },
    },
  });
  if (!oldEvent) {
    res.status(404).json({
      message: "Event not found",
    });
    return;
  }

    if(oldEvent.venue.ownerId !== userId) {
      res.status(403).json({
        message: "Only the venue owner can update the event",
      });
      return;
    }
  const event = await prisma.event.update({
    where: { id },
    data: { 
      name: parsedData.data.name,
      date: parsedData.data.date,
      genre: parsedData.data.genre,
      performer: parsedData.data.performer?.join(", "),
    },
  });
  res.status(200).json(event);
}
export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
 try {
  const oldEvent = await prisma.event.findUnique({
    where: { id },
    select: {
      venue: {
        select: {
          ownerId: true,
        },
      },
    },
  });
  if (!oldEvent) {
    res.status(404).json({
      message: "Event not found",
    });
    return;
  }
  if(oldEvent.venue.ownerId !== userId) {
    res.status(403).json({
      message: "Only the venue owner can delete the event",
    });
    return;
  }
  await prisma.event.delete({
    where: { id },
  });
  res.status(200).json({
    message: "Event deleted successfully",
  });
} catch (error) {
  res.status(500).json({
    message: "Internal server error",
  });
}
}
export const getEventsByVenueId: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
  const events = await prisma.event.findMany({
    where: { venueId: id },
  });
  res.status(200).json(events);
} catch (error) {
  res.status(500).json({
    message: "Internal server error",
  });
}
}
