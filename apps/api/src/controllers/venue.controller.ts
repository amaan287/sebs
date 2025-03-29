import LocationService from "../LocationService/HelperService";
import { postVenueSchema, updateVenueSchema } from "../types";
import { PrismaClient, VenueType } from "@prisma/client";
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
    description: parsedData.data.description,
    type: parsedData.data.type,
    address: parsedData.data.address,
    latitude: parsedData.data.latitude,
    longitude: parsedData.data.longitude,
    city: parsedData.data.city,
    country: parsedData.data.country,
    postalCode: parsedData.data.postalCode,
    openingTime: parsedData.data.openingTime,
    closingTime: parsedData.data.closingTime,
    phoneNumber: parsedData.data.phoneNumber,
    websiteUrl: parsedData.data.websiteUrl,
    image: parsedData.data.image,
    capacity: parsedData.data.capacity,
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
export const getVenueById:RequestHandler = async (req, res) => {
  const { id } = req.params;
  try{
  const venue = await prisma.venue.findUnique({
    where: { id },
  });
  if (!venue) {
    res.status(400).json({
      data: {
        message: "no venue",
      },
    });
    return;
      }
  res.status(200).json({
    data: {
      venue,
    },
  });}
  catch(e){
    console.log(e),
    res.status(500).json({
      data: {
        message: "Internal server error",
        error:e
      },
    });
  }
}
export const updateVenue:RequestHandler = async (req, res) => {
  const { id } = req.params
  const {userId} = req.body
  const parsedData = updateVenueSchema.safeParse(req.body)
  if (!parsedData.success) {
    res.status(400).json({
      data: {
        message: "Validation failed",
      },
    });
    return;
  }
  const owner = await prisma.user.findUnique({
    where: { id: userId },
  })
  if (!owner) {
    res.status(404).json({
      data: {
        message: "Owner not found",
      },
    });
    return;
  }
  if(!owner.admin) {
    res.status(400).json({
      data: {
        message: "Account type is not admin, please create an owner's account",
      },
    });
    return;
  }
  if (owner.id !== userId) {
    res.status(400).json({
      data: {
        message: "You are not authorized to update this venue",
      },
    });
    return;
  }
  // Create update data object with only provided fields
  const updateData: any = {};
  if (parsedData.data.name) updateData.name = parsedData.data.name;
  if (parsedData.data.description) updateData.description = parsedData.data.description;
  if (parsedData.data.type) updateData.type = parsedData.data.type;
  if (parsedData.data.address) updateData.address = parsedData.data.address;
  if (parsedData.data.postalCode) updateData.postalCode = parsedData.data.postalCode;
  if (parsedData.data.openingTime) updateData.openingTime = parsedData.data.openingTime;
  if (parsedData.data.closingTime) updateData.closingTime = parsedData.data.closingTime;
  if (parsedData.data.phoneNumber) updateData.phoneNumber = parsedData.data.phoneNumber;
  if (parsedData.data.websiteUrl) updateData.websiteUrl = parsedData.data.websiteUrl;
  if (parsedData.data.image) updateData.image = parsedData.data.image;
  if (parsedData.data.capacity) updateData.capacity = parsedData.data.capacity;
  if (parsedData.data.mapLink) updateData.mapLink = parsedData.data.mapLink;
  if (parsedData.data.isActive !== undefined) updateData.isActive = parsedData.data.isActive;
  const venue = await prisma.venue.update({
    where: { id },
    data: updateData,
  });

  res.status(200).json({
    data: {
      message: "Venue updated successfully",
      venue,
    },
  });
}

export const deleteVenue:RequestHandler = async (req, res) => {
  const { id } = req.params
  const {userId} = req.body
  const venue = await prisma.venue.delete({
    where: { id },
  })
  const owner = await prisma.user.findUnique({
    where: { id: userId },
  })
  if (!owner) {
    res.status(404).json({
      data: {
        message: "Owner not found",
      },
    });
    return;
  }
  if(!owner.admin) {
    res.status(400).json({
      data: {
        message: "Account type is not admin, please create an owner's account",
      },
    });
    return;
  }
  if (owner.id !== userId) {
    res.status(400).json({
      data: {
        message: "You are not authorized to delete this venue",
      },
    });
    return;
  }
  res.status(200).json({
    data: {
      message: "Venue deleted successfully",
      venue,
    },
  });
}
export const getVenueByOwnerId:RequestHandler = async (req, res) => {
  const { id } = req.params
  const owner = await prisma.user.findUnique({
    where: { id },
  })
  if (!owner) {
    res.status(404).json({
      data: {
        message: "Owner not found",
      },
    });
    return;
  }
  const venue = await prisma.venue.findMany({
    where: { ownerId: id },
  })
  res.status(200).json({
    data: {
      venue,
    },
  });
}


