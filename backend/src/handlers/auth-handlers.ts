import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

export async function registerUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error("El usuario ya existe");
      res.status(401).json({ error: error.message });
      return;
    }

    const slug = (await import("slug")).default;
    const handle = slug(req.body.handle, "");

    const handleExists = await User.findOne({ handle });

    if (handleExists) {
      const error = new Error("El nombre de usuario ya existe");
      res.status(409).json({ error: error.message });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = new User(req.body);
    user.password = hashedPassword;
    user.handle = handle;

    user.save();

    res.status(201).json({ message: "Cuenta creada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error inesperado" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      const error = new Error("El usuario no existe");
      res.status(404).json({ error: error.message });
      return;
    }

    const passwordIsCorrect = await checkPassword(
      password,
      userExists.password
    );

    if (!passwordIsCorrect) {
      const error = new Error("Contraseña incorrecta");
      res.status(401).json({ error: error.message });
      return;
    }

    res.status(200).json({ message: "Sesión iniciada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error inesperado" });
  }
}
