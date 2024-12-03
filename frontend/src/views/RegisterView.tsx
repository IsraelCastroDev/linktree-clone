import ErrorMessage from "@/components/ui/ErrorMessage";
import api from "@/config/axios";
import { RegisterForm } from "@/types";
import { isAxiosError } from "axios";
import { CheckCircle, CircleAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function RegisterView() {
  const location = useLocation();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    handle: location?.state?.handle ? location.state.handle : "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<RegisterForm>({
    defaultValues: initialValues,
  });

  const watchPassword = watch("password");

  const onSubmit = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        handle: formData.handle,
        password: formData.password,
      });

      reset();

      toast(data.message, {
        icon: <CheckCircle className="h-5 w-5" />,
      });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast(error.response.data.error, {
          duration: 3000,
          description: "No se pudo crear la cuenta",
          icon: <CircleAlertIcon className="h-5 w-5" />,
        });
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-white">Crear cuenta</h1>

      <nav className="mt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white px-5 py-10 rounded-lg space-y-10 mt-10"
        >
          <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="name" className="text-2xl text-slate-500">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("name", {
                required: { value: true, message: "El nombre es requerido" },
                minLength: {
                  value: 2,
                  message: "El nombre debe tener como mínimo 2 caracteres",
                },
              })}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>
          <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="email" className="text-2xl text-slate-500">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("email", {
                required: { value: true, message: "El email es requerido" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="handle" className="text-2xl text-slate-500">
              Handle
            </label>
            <input
              id="handle"
              type="text"
              placeholder="Nombre de usuario: sin espacios"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("handle", {
                required: { value: true, message: "El handle es requerido" },
                minLength: {
                  value: 5,
                  message: "El handle debe tener como mínimo 5 caracteres",
                },
              })}
            />
            {errors.handle && <ErrorMessage message={errors.handle.message} />}
          </div>
          <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="password" className="text-2xl text-slate-500">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password de Registro"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerido",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>

          <div className="grid grid-cols-1 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-2xl text-slate-500"
            >
              Repetir Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("password_confirmation", {
                required: {
                  value: true,
                  message: "Confirmar la contraseña es requerido",
                },
                validate: (value) =>
                  value === watchPassword || "La contraseñas deben coincidir",
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage message={errors.password_confirmation.message} />
            )}
          </div>

          <input
            type="submit"
            className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
            value="Crear Cuenta"
          />
        </form>

        <Link
          to={"/auth/login"}
          className="text-white text-lg block text-center mt-5"
        >
          ¿Ya tienes cuenta? Inicia sesión.
        </Link>
      </nav>
    </>
  );
}
