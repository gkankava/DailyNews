import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";

import trendingNewsKeys from "./trendingNewsKeys";
import createFetch from "../../../api/fetchApi";
import { apiUrl } from "../../../api/apiUrl";
import { AppConfig } from "../../../AppConfig";
import { TrendingNewsResponse } from "../../../types/Article";

const fetchApi = createFetch(apiUrl);

async function getTrendingNews({ queryKey, pageParam = 1 }: any): Promise<TrendingNewsResponse> {
  let { pageSize = 10 } = queryKey.slice(-1)[0];
  return await fetchApi<TrendingNewsResponse>(`/top-headlines`, {
    queryParams: { page: pageParam, pageSize, apiKey: AppConfig.API_KEY, country: "us" },
  }) as TrendingNewsResponse;
}

export default function useInfiniteTrendingNews(filters: any) {
  return useInfiniteQuery({
    queryKey: [...trendingNewsKeys.list(filters)],
    queryFn: getTrendingNews,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalResults = lastPage.totalResults;
      const totalPages = Math.ceil(totalResults / filters.pageSize);
      
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
