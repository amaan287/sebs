import { PrismaClient } from "@prisma/client";
import { signinSchema, signupSchema } from "../types";
import { compare, compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma: PrismaClient = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
export async function signup(req: any, res: any) {
  const parsedData = signupSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.error("parsed data incorrect: ", parsedData.error);
    res.status(400).json({ message: "validation failed" });
    return;
  }
  const oldUser = await prisma.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });
  if (oldUser) {
    res.json({ message: "email already exists try a different email" });
    return;
  }
  try {
    const hashedPassword: string = hashSync(parsedData.data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName: parsedData.data.firstName,
        lastName: parsedData.data.lastName,
        email: parsedData.data.email,
        password: hashedPassword,
        admin: parsedData.data.admin,
      },
    });
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, {
      expiresIn: "30d",
    });
    return res.json({
      data: {
        message: "signup successfull",
        token: token,
        user: newUser,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

export async function signin(req: any, res: any) {
  const parsedData = signinSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "validation failed" });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });
    if (!user) {
      console.error("user not found");
      res.status(400).json({
        data: {
          message: "signup failed user not found",
        },
      });
      return;
    }
    const isValid = compareSync(parsedData.data.password, user.password);
    if (!isValid) {
      res.status(400).json({
        data: {
          message: "incorrect Password",
        },
      });
      return;
    }
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({
      data: {
        message: "signed in successfully",
        user: user,
        token: token,
      },
    });
  } catch (e) {
    res.json({ message: "error " });
    console.log(e);
  }
}
