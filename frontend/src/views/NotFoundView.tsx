import { Link } from "react-router-dom";

export default function NotFoundView() {
  return (
    <>
      <p className="text-white font-bold text-3xl text-center">
        Usuario no encontrado
      </p>

      <Link
        to={"/"}
        className="block text-center font-semibold text-xl text-white underline-offset-1 underline mt-4"
      >
        Volver a la página de inicio
      </Link>
    </>
  );
}
