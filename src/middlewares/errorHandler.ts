import { Request, Response, NextFunction, RequestHandler } from "express";

export const errorHandler = (
  err: { type: string; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.type === "not_found") {
    res.status(404).send({
      message: err.message,
    });
  }

  return res.status(500).send({
    message: "Something went wrong",
  });
};
