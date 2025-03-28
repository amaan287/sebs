import { PrismaClient } from "@prisma/client";

// Helper service for location operations
class LocationService {
    private prisma: PrismaClient = new PrismaClient();
  
    // Convert lat/long to PostGIS point string
    formatLocationPoint(latitude: number, longitude: number): string {
      return `POINT(${longitude} ${latitude})`;
    }
  
    // Create venue with location
    async createVenueWithLocation(data: {
      name: string,
      latitude: number,
      longitude: number,
      // other venue details
    }) {
      return this.prisma.venue.create({
        data: {
          ...data,
          location: this.formatLocationPoint(data.latitude, data.longitude)
        }
      });
    }
  
    // Query nearby venues
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