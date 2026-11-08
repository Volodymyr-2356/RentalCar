import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/api/cars";
import type { CarsFilters } from "@/types/car";

export const useCars = (filters: Omit<CarsFilters, "page"> = {}) => {
  return useInfiniteQuery({
    queryKey: ["cars", filters],

    queryFn: ({ pageParam }) =>
      getCars({
        ...filters,
        page: pageParam,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });
};
