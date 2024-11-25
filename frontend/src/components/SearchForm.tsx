import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import ErrorMessage from "./ui/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "@/api/linktreeAPI";
import { Link } from "react-router-dom";

export default function SearchForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: "",
    },
  });

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: searchByHandle,
  });

  const handle = watch("handle");

  const handleSearch = () => {
    const slug = slugify(handle);
    mutate(slug);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="space-y-5">
      <div className="relative flex items-center  bg-white  px-2">
        <label htmlFor="handle">devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1 outline-none"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.handle && <ErrorMessage message={errors.handle.message} />}

      <div className="mt-10">
        {error && <ErrorMessage message={error.message} />}
        {data && (
          <p className="text-slate-800 font-bold">
            {data.message},{" "}
            <Link
              to={"/auth/register"}
              className="underline underline-offset-2 text-green-500"
              state={{ handle: slugify(handle) }}
            >
              regístrate
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value={`${isPending ? "Buscando..." : "Obtener mi link"}`}
      />
    </form>
  );
}
