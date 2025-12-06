import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  kpiMetrics,
  type MetricsFilter,
  type KpiMetricsResponse,
} from "@/services/metrics.service";

type MetricsContextState = {
  filters: MetricsFilter;
  setFilters: (
    filters: MetricsFilter | ((prev: MetricsFilter) => MetricsFilter)
  ) => void;
  metrics: KpiMetricsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

type MetricsProviderProps = {
  children: ReactNode;
  defaultFilters?: MetricsFilter;
};

const defaultFilterValues: MetricsFilter = {
  regions: [],
  start_date: "2024-01-01",
  end_date: "2024-03-31",
};

const MetricsContext = createContext<MetricsContextState | undefined>(
  undefined
);

export function MetricsProvider({
  children,
  defaultFilters = defaultFilterValues,
}: MetricsProviderProps) {
  const [filters, setFilters] = useState<MetricsFilter>(defaultFilters);

  const {
    data: metrics,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["metrics", filters],
    queryFn: () => kpiMetrics(filters),
  });

  const value: MetricsContextState = {
    filters,
    setFilters,
    metrics,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };

  return (
    <MetricsContext.Provider value={value}>{children}</MetricsContext.Provider>
  );
}

// Custom hook to use the metrics context
// eslint-disable-next-line react-refresh/only-export-components
export const useMetrics = () => {
  const context = useContext(MetricsContext);

  if (context === undefined) {
    throw new Error("useMetrics must be used within a MetricsProvider");
  }

  return context;
};
