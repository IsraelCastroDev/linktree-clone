import { Router } from "express";
import { body } from "express-validator";
import {
  getUser,
  getUserByHandle,
  login,
  registerUser,
  updateProfile,
  uploadImage,
} from "./handlers/auth-handlers";
import { validateErrors } from "./middlewares/validateErrors";
import { authenticate } from "./middlewares/authenticate";

const router = Router();

router.post(
  "/auth/register",
  body("name")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener mínimo 2 caracteres"),
  body("handle").notEmpty().withMessage("El handle es requerido"),
  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Email inválido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener mínimo 8 caracteres"),
  validateErrors,
  registerUser
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("Email no válido"),
  body("password").notEmpty().withMessage("Ingrese su contraseña porfavor"),
  validateErrors,
  login
);

router.get("/user", authenticate, getUser);

router.patch(
  "/user",
  authenticate,
  body("handle").notEmpty().withMessage("El handle es requerido"),
  body("description").notEmpty().withMessage("La descripción es requerido"),
  validateErrors,
  updateProfile
);

router.post("/user/image", authenticate, uploadImage);

router.get("/:handle", getUserByHandle);

export default router;
