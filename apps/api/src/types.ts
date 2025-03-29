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
  description: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  ownerId: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  openingTime: z.date(),
  closingTime: z.date(),
  phoneNumber: z.string(),
  websiteUrl: z.string(),
  image: z.array(z.string()),
  capacity: z.number(),
});

export const venue = z.object({
  id: z.string(),
  owner: user,
  name: z.string(),
  type: z.enum(["CAFE", "BAR", "CLUB", "ROOFTOP"]),
  address: z.string(),
  postalCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  ownerId: z.string(),
  description: z.string().optional(),
  city: z.string(),
  country: z.string(),
  image: z.array(z.string()).optional(),
  websiteUrl: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  capacity: z.number().optional(),
  isActive: z.boolean().default(true),
  location: z.string().optional(),

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

export const createEventSchema = z.object({
  userId: z.string(),
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
  venueId: z.string(),
  venue: venue,
  performer: z.array(z.string()),
});

export const findVenueSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  radius: z.number()
});

export const findVenueByTypeSchema = z.object({
  type: z.enum(["CAFE", "BAR", "CLUB", "ROOFTOP"]),
  latitude: z.number(),
  longitude: z.number(),
  radius: z.number()
});

export const updateVenueSchema = z.object({
  name: z.string().optional(),
  type: z.enum(["CAFE", "BAR", "CLUB", "ROOFTOP"]).optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  phoneNumber: z.string().optional(),
  websiteUrl: z.string().optional(),
  postalCode: z.string().optional(),
  openingTime: z.date().optional(),
  closingTime: z.date().optional(),
  isActive: z.boolean().optional(),
  image: z.array(z.string()).optional(),
  capacity: z.number().optional(),
  mapLink: z.string().optional(),
});

export const updateEventSchema = z.object({
  name: z.string().optional(),
  date: z.date().optional(),
  genre: z.enum(["TECHNO", "HOUSE", "JAZZ", "HIPHOP", "ROCK", "POP", "CLASSICAL", "OTHER"]).optional(),
  performer: z.array(z.string()).optional(),
});