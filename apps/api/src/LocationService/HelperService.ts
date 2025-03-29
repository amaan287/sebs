import { PrismaClient, Prisma, VenueType } from "@prisma/client";

class LocationService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private formatLocationPoint(latitude: number, longitude: number): string {
    return `POINT(${longitude} ${latitude})`;
  }

  async createVenueWithLocation(data: Prisma.VenueCreateInput) {
    return this.prisma.venue.create({
      data: {
        ...data,
        location: this.formatLocationPoint(
          data.latitude as number,
          data.longitude as number
        ),

        owner: {
          connect: { id: data.owner.connect?.id },
        },
      },
    });
  }

  async createVenueWithLocationUnchecked(
    data: Prisma.VenueUncheckedCreateInput
  ) {
    return this.prisma.venue.create({
      data: {
        ...data,
        location: this.formatLocationPoint(
          data.latitude as number,
          data.longitude as number
        ),
      },
    });
  }

  // Find nearby venues
  async findNearbyVenues(
    latitude: number,
    longitude: number,
    radiusInMeters: number,
  ) {
    return this.prisma.$queryRaw`
      SELECT 
        *,
        ST_Distance(
          location::geography, 
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)
        ) AS distance
      FROM "Venue"
      WHERE ST_DWithin(
        location::geography, 
        ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326),
        ${radiusInMeters}
      )
      ORDER BY distance
    `;
  }

  async findNearbyVenueByType(type: VenueType, latitude: number, longitude: number, radiusInMeters: number,) {
    return this.prisma.$queryRaw`
      SELECT 
        *,
        ST_Distance(
          location::geography, 
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)
        ) AS distance
      FROM "Venue"
      WHERE type = ${type} AND ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326), ${radiusInMeters})
      ORDER BY distance
    `;
  }

  async findNearbyEvents(latitude: number, longitude: number, radiusInMeters: number) {
    return this.prisma.$queryRaw`
      SELECT 
        *,
        ST_Distance(
          location::geography, 
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)
        ) AS distance
      FROM "Event"
      WHERE ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326), ${radiusInMeters})
      ORDER BY distance
    `;
  }
  async findNearbyEventsByType(latitude: number, longitude: number, radiusInMeters: number, type: string) {
    return this.prisma.$queryRaw`
    SELECT 
    *,
    ST_Distance(
      location::geography, 
      ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)
      ) AS distance
    FROM "Event"
    WHERE type = ${type} AND ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326), ${radiusInMeters})
    ORDER BY distance
    `;
  }
  
}
  export default LocationService;
