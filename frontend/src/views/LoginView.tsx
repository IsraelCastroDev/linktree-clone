import { Link } from "react-router-dom";

function LoginView() {
  return (
    <>
      <h1 className="text-4xl font-bold text-white">Iniciar sesión</h1>
      <nav className="mt-10">
        <Link
          to={"/auth/register"}
          className="text-white text-lg block text-center"
        >
          ¿No tienes cuenta? Crea una aquí
        </Link>
      </nav>
    </>
  );
}
export default LoginView;
