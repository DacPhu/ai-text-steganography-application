import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// Define a type for the user payload decoded from JWT
interface UserPayload {
  [key: string]: any;
}

// Extend the Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken; // Ensure req.cookies is properly typed in your project setup
    if (!accessToken) {
      return res.status(401).json({ message: "Access token not provided" });
    }

    const publicKey = fs.readFileSync(path.join(__dirname, "../jwt.key.pub"));
    const validToken = jwt.verify(accessToken, publicKey) as UserPayload;
    console.log("THIS IS BODY", req.body);
    req.user = validToken; // Assigning validToken to req.user
    console.log("validateToken: ", req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export { validateToken };
