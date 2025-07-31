import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || null,
  });
}
