import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addToFavourites: RequestHandler = async (req, res) => {
  const { venueId } = req.body;
  const { userId } = req.body;
  const favourite = await prisma.favorite.create({
    data: {
      venueId: venueId,
      userId: userId,
    },
  });
  res.status(200).json(favourite);
};

export const removeFromFavourites: RequestHandler = async (req, res) => {
  const { venueId } = req.body;
  const { userId } = req.body;
  if (!venueId || !userId) {
    res.status(400).json({
      message: "Venue ID and user ID are required",
    });
    return;
  }
  try {
    const favorite = await prisma.favorite.findFirst({
      where: { venueId, userId }
    });
    
    if (!favorite) {
      res.status(404).json({
        message: "Favorite not found"
      });
      return;
    }

    await prisma.favorite.delete({
      where: { id: favorite.id }
    });
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


