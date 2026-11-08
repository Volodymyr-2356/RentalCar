import { api } from "../axios";
import type {
  Car,
  CarsFilters,
  CarsResponse,
  CarsFiltersResponse,
} from "@/types/car";

export const getCars = async (
  params: CarsFilters = {},
): Promise<CarsResponse> => {
  const { data } = await api.get<CarsResponse>("/cars", {
    params,
  });

  return data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${id}`);

  return data;
};

export const getBrands = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("cars/filters");

  return data;
};

export const getCarsFilters = async (): Promise<CarsFiltersResponse> => {
  const { data } = await api.get<CarsFiltersResponse>("/cars/filters");
  return data;
};
