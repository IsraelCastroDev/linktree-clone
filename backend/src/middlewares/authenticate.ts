import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { UserModelType } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: UserModelType;
    }
  }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }
    const [, token] = bearer.split(" ");

    if (!token) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }

    try {
      const result = jwt.verify(token, process.env.JWT_SECRET!);
      if (typeof result === "object" && result.id) {
        const user = await User.findById(result.id).select("-password");
        if (!user) {
          res.status(404).json({ error: "El usuario no existe" });
          return;
        }

        req.user = user;

        next();
      }
    } catch (error) {
      console.error("Error en la verificación del token:", error);
      res.status(500).json({ error: "Token no válido" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error inesperado" });
  }
}
