import { Request, Response } from "express";

export const pingCheck = (_: Request, res: Response) => {
  res.status(200).json({ msg: "ok" });
};
