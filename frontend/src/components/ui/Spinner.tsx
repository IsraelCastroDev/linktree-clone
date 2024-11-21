import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className="absolute top-1/2 left-1/2">
      <span className={styles.loader}></span>
    </div>
  );
}
