import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/userModel";
import CODE from "../utils/statusCodes";
export interface AuthRequest extends Request {
  user?: any;
}
const JWT_SECRET = process.env.JWT_SECRET as Secret;

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Read token from cookie
  const token = req.cookies?.token;
  if (!token) {
    return res.status(CODE.UNAUTHORIZED).json({ error: "No token provided" });
  }
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(CODE.UNAUTHORIZED).json({ error: "Invalid token" });
    }
    next();
  } catch {
    res.status(CODE.UNAUTHORIZED).json({ error: "Invalid or expired token" });
  }
};
