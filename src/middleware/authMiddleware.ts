import { Request, Response, NextFunction } from "express";
import { Secret } from "jsonwebtoken";
import CODE from "../utils/statusCodes";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
export interface AuthRequest extends Request {
  user?: any;
}

const JWT_SECRET = process.env.JWT_SECRET as Secret;
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(CODE.UNAUTHORIZED).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user)
      return res.status(CODE.UNAUTHORIZED).json({ error: "Invalid token" });
    next();
  } catch {
    res.status(CODE.UNAUTHORIZED).json({ error: "Invalid or expired token" });
  }
};
