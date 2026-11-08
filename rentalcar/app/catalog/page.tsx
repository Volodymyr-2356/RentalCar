"use client";

import { useState } from "react";
import { useCars } from "@/hooks/useCars";
import { useCarsFilters } from "@/hooks/useCarsFilters";
import type { CarsFilters } from "@/types/car";
import CarCard from "@/components/CarCard/CarCard";
import CatalogFilters from "@/components/Filters/CatalogFilters";
import styles from "./Catalog.module.css";

type FilterValues = Omit<CarsFilters, "page" | "perPage">;

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterValues>({});

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCars(filters);

  const {
    data: filterOptions,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useCarsFilters();

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  if (isLoading || isFiltersLoading) {
    return <p className={styles.message}>Loading cars...</p>;
  }

  if (isError || isFiltersError || !filterOptions) {
    return (
      <p className={styles.message}>Something went wrong. Please try again.</p>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Car catalog</h1>

      <CatalogFilters
        options={filterOptions}
        onSearch={setFilters}
        onReset={() => setFilters({})}
      />

      {cars.length === 0 ? (
        <p className={styles.message}>No cars found.</p>
      ) : (
        <div className={styles.grid}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <button
          type="button"
          className={styles.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </main>
  );
}
