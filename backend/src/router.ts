import { Router } from "express";
import { body } from "express-validator";
import { registerUser } from "./handlers/auth-handlers";
import { validateErrors } from "./middlewares/validateErrors";

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

export default router;
