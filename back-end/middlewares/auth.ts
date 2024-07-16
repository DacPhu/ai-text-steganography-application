import { Request, Response, NextFunction } from "express";

export const require_login = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

