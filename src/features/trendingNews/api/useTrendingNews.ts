import { useQuery, UseQueryResult } from "@tanstack/react-query";

import trendingNewsKeys from "./trendingNewsKeys";
import createFetch from "../../../api/fetchApi";
import { apiUrl } from "../../../api/apiUrl";
import { AppConfig } from "../../../AppConfig";
import { TrendingNewsResponse } from "../../../types/Article";

const fetchApi = createFetch(apiUrl);

async function getTrendingNews({ queryKey }: any): Promise<TrendingNewsResponse> {
  let { page = 1, pageSize = 21 } = queryKey.slice(-1)[0];
  return await fetchApi<TrendingNewsResponse>(`/top-headlines`, {
    queryParams: { page, pageSize, apiKey: AppConfig.API_KEY, country: "us" },
  }) as TrendingNewsResponse;
}

export default function useTrendingNews(filters: any): UseQueryResult<TrendingNewsResponse> {

  return useQuery<TrendingNewsResponse>({
    queryKey: [...trendingNewsKeys.list(filters)],
    queryFn: getTrendingNews,
  });
}
