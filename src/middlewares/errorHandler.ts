import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: { type: string; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err.type === "not_found") {
    return res.status(404).send({
      message: err.message,
    });
  }

  return res.status(500).send({
    message: "Something went wrong",
  });
};
