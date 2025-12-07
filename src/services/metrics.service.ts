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
  total_cost: number;
  spends_trend: {
    date: string;
    cost: number;
  }[];
  region_wise_spends: {
    region: string;
    spends: number;
  }[];
  cost_distribution_by_model: {
    mode: string;
    cost: number;
  }[];
};

export type RequestResponse<T> = {
  data: T;
  message: string;
};

export async function kpiMetrics(filter: MetricsFilter) {
  console.log(filter);
  let query = "";
  if (filter.regions.length > 0) {
    // ?region=EU&region=US
    query = filter.regions.reduce((acc, region) => {
      acc += `&regions=${region}`;
      return acc;
    }, query);
  }

  query += `&start_date=${filter.start_date}&end_date=${filter.end_date}`;

  console.log(query);
  const res = await api.get<RequestResponse<KpiMetricsResponse>>(
    `/metrics/kpis?${query}`
  );

  return res.data.data;
}
