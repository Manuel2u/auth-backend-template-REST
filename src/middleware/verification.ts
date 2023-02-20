import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}

const verifytoken = (req: Request, res: Response, next: NextFunction) => {
  let token;

  try {
    token = req.headers.authorization?.split(" ")[1];

    const decoded: any = jwt.verify(
      token || "",
      "process.env.JWT_SECRET" || ""
    );

    if (decoded.exp < Date.now() / 1000) {
      res.status(401).json({ message: "Token Expired" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized Access" });
  }

  if (!token) {
    throw new Error("Unauthorized Acces");
  }
};

export default verifytoken;
