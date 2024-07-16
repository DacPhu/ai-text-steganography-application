import { Request, Response, NextFunction } from "express";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).send({ title: "Page Not Found" });
}

export function csrfErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(req);
  if (err.code === "EBADCSRFTOKEN") {
    res.status(403).send({ title: "Form Tampered With" });
  } else {
    next(err);
  }
}

export function generalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).send({ title: "Server Error", error: err.message });
}
