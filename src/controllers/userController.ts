import { Request, Response } from "express";
import CODE from "../utils/statusCodes";

export const getUsers = (req: Request, res: Response) => {
  res.status(CODE.OK).json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
};

export const createUser = (req: Request, res: Response) => {
  res.status(CODE.CREATED).json({ response: req.body });
};
