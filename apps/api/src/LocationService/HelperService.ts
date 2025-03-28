import { PrismaClient, Prisma } from "@prisma/client";

class LocationService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // Format location point for PostGIS
  private formatLocationPoint(latitude: number, longitude: number): string {
    return `POINT(${longitude} ${latitude})`;
  }

  // Create venue with location - type-safe version
  async createVenueWithLocation(data: Prisma.VenueCreateInput) {
    return this.prisma.venue.create({
      data: {
        ...data,
        location: this.formatLocationPoint(
          data.latitude as number,
          data.longitude as number
        ),
        // Ensure owner relation is correctly handled
        owner: {
          connect: { id: data.owner.connect?.id },
        },
      },
    });
  }

  // Alternative method with unchecked input if needed
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
    radiusInMeters: number = 5000
  ) {
    return this.prisma.$queryRaw`
      SELECT 
        *,
        ST_Distance(
          location::geography, 
          ST_GeographyFromText('POINT(${longitude} ${latitude})')
        ) AS distance
      FROM "Venue"
      WHERE ST_DWithin(
        location::geography, 
        ST_GeographyFromText('POINT(${longitude} ${latitude})'),
        ${radiusInMeters}
      )
      ORDER BY distance
    `;
  }
}

// Example usage
async function exampleVenueCreation() {
  const prisma = new PrismaClient();
  const locationService = new LocationService(prisma);

  try {
    // Correct way to create a venue with owner
    const newVenue = await locationService.createVenueWithLocation({
      name: "Cool Bar",
      type: "BAR",
      latitude: 40.7128,
      longitude: -74.006,
      address: "123 Main St",
      city: "New York",
      country: "USA",
      mapLink: "https://maps.example.com",
      owner: {
        connect: { id: "existing-user-id" },
      },
    });
  } catch (error) {
    console.error("Error creating venue:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export default LocationService;
