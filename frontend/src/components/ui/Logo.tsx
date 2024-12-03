import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <p className="text-5xl text-white text-center">SuperTreeLink</p>
    </Link>
  );
}
