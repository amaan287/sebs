import z from "zod";
export const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  admin: z.boolean().default(false),
});

export const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export const user = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  admin: z.boolean().default(false),
});

export const postVenueSchema = z.object({
  name: z.string(),
  type: z.enum(["CAFE", "BAR", "CLUB", "ROOFTOP"]),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  ownerId: z.string(),
});

export const venue = z.object({
  id: z.string(),
  owner: user,
  name: z.string(),
  type: z.enum(["CAFE", "BAR", "CLUB", "ROOFTOP"]),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  ownerId: z.string(),
});
// Favorite Schema
export const favoriteSchema = z.object({
  user: user,
  userId: z.string(),
  venue: venue,
  venueId: z.string(),
});

// Event Schema
export const eventSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.date(),
  genre: z.enum([
    "TECHNO",
    "HOUSE",
    "JAZZ",
    "HIPHOP",
    "ROCK",
    "POP",
    "CLASSICAL",
    "OTHER",
  ]),
  performer: z.string(),
  venue: venue,
  venueId: z.string(),
});

export const postEventSchema = z.object({
  name: z.string(),
  date: z.date(),
  genre: z.enum([
    "TECHNO",
    "HOUSE",
    "JAZZ",
    "HIPHOP",
    "ROCK",
    "POP",
    "CLASSICAL",
    "OTHER",
  ]),
  venue: venue,
  venueId: z.string(),
});
