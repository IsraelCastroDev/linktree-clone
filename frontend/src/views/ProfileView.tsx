import { updateProfile } from "@/api/linktreeAPI";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ProfileForm, User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, CircleAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["get-user"])!;

  const initialValues = {
    handle: user.handle,
    description: user.description,
  };
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ defaultValues: initialValues });

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast(error.message, { icon: <CircleAlertIcon className="h-5 w-5" /> });
    },
    onSuccess: (data) => {
      toast(data.message, { icon: <CheckCircle className="h-5 w-5" /> });
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
  });

  const handleUserProfile = (formData: ProfileForm) => {
    mutate(formData);
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfile)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", {
            required: {
              value: true,
              message: "El nombre de usuario es requerido",
            },
          })}
        />
        {errors.handle && <ErrorMessage message={errors.handle.message} />}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description")}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={() => {}}
        />
      </div>

      <input
        type="submit"
        value={isPending ? "guardando cambios..." : "guardar cambios"}
        className="text-lg w-full uppercase text-slate-600 font-bold cursor-pointer p-2 bg-cyan-400 h-auto rounded-lg disabled:opacity-50 disabled:cursor-default"
        disabled={isPending}
      />
    </form>
  );
}
