import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <main className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>Find your perfect rental car</h1>

          <Link href="/catalog" className={styles.button}>
            View Catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
