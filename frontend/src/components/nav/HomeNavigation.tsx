import { Link } from "react-router-dom";

export default function HomeNavigation() {
  return (
    <>
      <Link
        to={"/auth/login"}
        className="text-white p-2 uppercase font-black text-xs cursor-pointer"
      >
        Iniciar sesión
      </Link>

      <Link
        to={"/auth/register"}
        className="text-white bg-lime-500 p-2 uppercase font-black text-xs cursor-pointer rounded-lg"
      >
        Registrarme
      </Link>
    </>
  );
}
