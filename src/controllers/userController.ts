import { Request, Response, NextFunction } from "express";
import CODE from "../utils/statusCodes";
import User from "../models/userModel";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(CODE.OK).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(CODE.CREATED).json(savedUser);
  } catch (error) {
    next(error);
  }
};
