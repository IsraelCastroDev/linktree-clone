import { Request, Response } from "express";
import formidable from "formidable";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import cloudinary from "../config/cloudinary";
import { v4 as uuid } from "uuid";
import { generateJWT } from "../utils/jwt";

export async function registerUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error("El usuario ya existe");
      res.status(409).json({ error: error.message });
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

    const tokenJWT = generateJWT({ id: userExists._id });

    res.status(200).json({ token: tokenJWT });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error inesperado" });
  }
}

export async function getUser(req: Request, res: Response) {
  const user = req.user;
  res.json(user);
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const { description, links } = req.body;

    const slug = (await import("slug")).default;
    const handle = slug(req.body.handle, "");

    const handleExists = await User.findOne({ handle });

    if (handleExists && handleExists.email !== req.user?.email) {
      const error = new Error("El nombre de usuario ya existe");
      res.status(409).json({ error: error.message });
      return;
    }

    if (!req.user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    req.user.handle = handle;
    req.user.description = description;
    req.user.links = links;
    req.user.save();

    res.status(200).json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error inesperado" });
  }
}

export async function uploadImage(req: Request, res: Response) {
  const form = formidable({ multiples: false });

  try {
    form.parse(req, (error, fields, files) => {
      if (files.file) {
        cloudinary.uploader.upload(
          files.file[0].filepath,
          { public_id: uuid() },
          async (error, result) => {
            if (error) {
              res
                .status(500)
                .json({ error: "Hubo un error al subir la imagen" });
              return;
            }

            if (result) {
              if (req.user) {
                req.user.image = result.secure_url;
                await req.user.save();
                res.json({ image: result.secure_url });
              }
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error inesperado" });
  }
}

export async function getUserByHandle(req: Request, res: Response) {
  try {
    const { handle } = req.params;

    const user = await User.findOne({ handle }).select(
      "-password -_id -__v -email"
    );

    if (!user) {
      res.status(404).json({ error: "Usuario no econtrado" });
      return;
    }

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error" });
  }
}

export async function searchByHandle(req: Request, res: Response) {
  try {
    const { handle } = req.body;

    const userExists = await User.findOne({ handle });

    if (userExists) {
      res.status(409).json({ error: `${handle} ya esta en uso` });
      return;
    }

    res.status(200).json({ message: `${handle} está disponible` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error" });
  }
}
