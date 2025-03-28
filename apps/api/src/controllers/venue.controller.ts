import { postVenueSchema } from "../types";
import { PrismaClient } from "@prisma/client";
const prisma: PrismaClient = new PrismaClient();
export async function postVenue(req: any, res: any) {
  const parsedData = postVenueSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log("error", parsedData.error);
    return res.status(400).json({
      data: {
        message: "Validation failed",
      },
    });
  }

  const owner = await prisma.user.findUnique({
    where: { id: parsedData.data.ownerId },
  });

  if (!owner) {
    return res.status(404).json({
      data: {
        message: "Owner not found",
      },
    });
  }

  if (!owner.admin) {
    return res.status(400).json({
      data: {
        message: "Account type is not admin, please create an owner's account",
      },
    });
  }

  const venue = await prisma.$executeRaw`
    INSERT INTO "Venue" (id, name, type, address, location, ownerId, createdAt, updatedAt)
    VALUES (
      gen_random_uuid(),
      ${parsedData.data.name},
      ${parsedData.data.type},
      ${parsedData.data.address},
      ST_SetSRID(ST_MakePoint(${parsedData.data.longitude}, ${parsedData.data.latitude}), 4326),
      ${owner.id},
      NOW(),
      NOW()
    )
    RETURNING *;
  `;

  return res.status(200).json({
    data: {
      message: "Venue created successfully",
      venue,
    },
  });
}
export async function getAllVenue(req: any, res: any) {
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
        }, // Fetch owner details
      },
    });
    if (!venue) {
      res.status(400).json({
        data: {
          message: "no venues",
        },
      });
    }
    res.status(200).json({
      data: {
        venue: venue,
      },
    });
  } catch (e) {}
}
