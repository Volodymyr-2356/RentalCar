"use client";

import { useCar } from "@/hooks/useCar";
import styles from "./CarDetails.module.css";
import BookingForm from "@/components/Cars/BookingForm";

interface CarDetailsClientProps {
  carId: string;
}

export default function CarDetailsClient({ carId }: CarDetailsClientProps) {
  const { data: car, isLoading, isError } = useCar(carId);

  if (isLoading) {
    return <p>Loading car details...</p>;
  }

  if (isError || !car) {
    return <p>Failed to load car details.</p>;
  }

  const location = `${car.location.city}, ${car.location.country}`;

  return (
    <main className={styles.container}>
      <div className={styles.leftColumn}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={styles.image}
        />

        <div className={styles.rentalForm}>
          <BookingForm carId={car.id} />
        </div>
      </div>

      <div className={styles.rightColumn}>
        <h1>
          {car.brand} {car.model}, {car.year}
        </h1>

        <p className={styles.location}>{location}</p>

        <p className={styles.price}>${car.rentalPrice}</p>

        <p className={styles.description}>{car.description}</p>

        <section className={styles.section}>
          <h2>Rental Conditions</h2>
          <ul>
            {car.rentalConditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Car Specifications</h2>
          <ul>
            <li>Year: {car.year}</li>
            <li>Type: {car.type}</li>
            <li>Fuel consumption: {car.fuelConsumption}</li>
            <li>Engine: {car.engine}</li>
            <li>Mileage: {car.mileage.toLocaleString("en-US")} km</li>
            <li>Rental company: {car.rentalCompany}</li>
            <li>Stock number: {car.stockNumber}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Features</h2>
          <ul>
            {car.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
