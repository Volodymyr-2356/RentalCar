import { useQuery } from "@tanstack/react-query";
import { getCarsFilters } from "@/lib/api/cars";

export const useCarsFilters = () => {
  return useQuery({
    queryKey: ["cars", "filters"],
    queryFn: getCarsFilters,
    staleTime: 5 * 60 * 1000,
  });
};
