import Link from "next/link";
import type { Car } from "@/types/car";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const location = `${car.location.city}, ${car.location.country}`;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>
            {car.brand} <span>{car.model}</span>, {car.year}
          </h2>

          <p className={styles.price}>${car.price}</p>
        </div>

        <p className={styles.details}>
          {location} <span>|</span> {car.rentalCompany}
        </p>

        <p className={styles.details}>
          {car.type} <span>|</span> {car.mileage.toLocaleString("en-US")} km
        </p>

        <Link
          href={`/catalog/${car.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
