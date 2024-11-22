import styles from "./Spinner.module.css";

interface SpinnerProps {
  message?: string;
  color?: "slate" | "white";
}

export default function Spinner({ message, color = "slate" }: SpinnerProps) {
  return (
    <div className="absolute top-64 left-1/2 flex justify-center items-center flex-col gap-2">
      <span
        className={`${styles.loader} border-4 ${
          color === "white" ? "border-white" : "border-slate-800"
        }`}
      ></span>
      {message && (
        <p
          className={`mt-3 font-semibold text-lg ${
            color === "white" ? "text-white" : "text-slate-800"
          } text-center`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
