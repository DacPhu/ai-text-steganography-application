import { Request, Response, NextFunction } from "express";
import { Buffer } from "buffer";

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  const originalWrite = res.write;
  const originalEnd = res.end;
  const chunks: Buffer[] = [];

  res.write = function (chunk: any, ...args: any[]) {
    chunks.push(Buffer.from(chunk));
    originalWrite.apply(res, [chunk, ...args]);
  };

  res.end = function (chunk: any, ...args: any[]) {
    if (chunk) {
      chunks.push(Buffer.from(chunk));
    }
    const responseBody = Buffer.concat(chunks).toString("utf8");
    const elapsedTime = Date.now() - startTime;

    const contentType = res.getHeader("Content-Type") as string | undefined;
    const shouldLog =
      !contentType?.includes("text/html") &&
      !req.originalUrl.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|bmp)$/i);

    if (shouldLog) {
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsedTime}ms`
      );
      console.log(`Response Headers: ${JSON.stringify(res.getHeaders())}`);
      console.log(`Response Body: ${responseBody}`);
    }
    originalEnd.apply(res, [chunk, ...args]);
  };

  next();
};
