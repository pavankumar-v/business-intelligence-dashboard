import { api } from "@/lib/api-client";

export type MetricsFilter = {
  regions: string[];
  start_date: string;
  end_date: string;
};

export type KpiMetricsResponse = {
  highest_model_used: string;
  avg_spending_per_day: number;
  costliest_model: string;
  least_used_model: string;
  avg_token_consumption_per_day: number;
  model_efficiency: number;
  active_subscriber_utilization_rate: number;
};

export type RequestResponse<T> = {
  data: T;
  message: string;
};

export async function kpiMetrics(filter: MetricsFilter) {
  const res = await api.get<RequestResponse<KpiMetricsResponse>>(
    "/metrics/kpis",
    {
      params: filter,
    }
  );

  return res.data.data;
}
