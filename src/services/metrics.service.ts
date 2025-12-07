import { api } from "@/lib/api-client";

export type MetricsFilter = {
  regions: string[];
  start_date: string;
  end_date: string;
};

export type KpiMetricsResponse = {
  kpis: {
    total_spendings: string;
    heighest_model_used: string;
    average_token_consumption: number;
    average_per_day_spending: number;
    active_sub_utilization: number;
    spends_trend: { date: string; cost: number }[];
  };
  models_metrics: {
    model: string;
    total_cost: number;
  }[];
  region_wise_spends: {
    region: string;
    total_spends: number;
  }[];
  company_wise_spends: {
    company: string;
    total_spends: number;
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

  console.log(res.data);

  return res.data.data;
}
