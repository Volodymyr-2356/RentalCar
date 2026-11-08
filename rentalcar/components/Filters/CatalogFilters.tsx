"use client";

import { useState } from "react";
import type { CarsFilters, CarsFiltersResponse } from "@/types/car";
import styles from "./CatalogFilters.module.css";

type FilterValues = Omit<CarsFilters, "page" | "perPage">;

interface CatalogFiltersProps {
  options: CarsFiltersResponse;
  onSearch: (filters: FilterValues) => void;
  onReset: () => void;
}

export default function CatalogFilters({
  options,
  onSearch,
  onReset,
}: CatalogFiltersProps) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch({
      ...(brand && { brand }),
      ...(price && { price: Number(price) }),
      ...(minMileage && { minMileage: Number(minMileage) }),
      ...(maxMileage && { maxMileage: Number(maxMileage) }),
    });
  };

  const handleReset = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");
    onReset();
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span>Brand</span>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Choose a brand</option>
          {options.brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>Price</span>
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="">Any price</option>
          {Array.from(
            { length: options.price.max - options.price.min + 1 },
            (_, index) => options.price.min + index,
          ).map((value) => (
            <option key={value} value={value}>
              ${value}
            </option>
          ))}
        </select>
      </label>

      <fieldset className={styles.mileage}>
        <legend>Car mileage / km</legend>
        <div className={styles.mileageFields}>
          <input
            type="number"
            min="0"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
          />
        </div>
      </fieldset>

      <button type="submit" className={styles.searchButton}>
        Search
      </button>

      <button
        type="button"
        className={styles.resetButton}
        onClick={handleReset}
      >
        Reset
      </button>
    </form>
  );
}
