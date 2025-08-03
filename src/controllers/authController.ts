import dotenv from "dotenv";
import { CookieOptions, NextFunction, Request, Response } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import User from "../models/userModel";
import CODE from "../utils/statusCodes";
dotenv.config();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email }).select("_id");
    if (userExists) {
      return res
        .status(CODE.CONFLICT)
        .json({ error: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    res.status(CODE.CREATED).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(CODE.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      } as SignOptions
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: Number(process.env.MAX_AGE),
      path: "/",
    });
    res.status(CODE.OK).json({ message: "user login successfully" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      res.status(CODE.OK).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }

    res.clearCookie("token");
    res.status(CODE.OK).json({ message: "user logout successfully" });
  } catch (error) {
    next(error);
  }
};
