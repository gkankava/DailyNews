import { useInfiniteQuery } from "@tanstack/react-query";

import newsKeys from "./newsKeys";
import createFetch from "../../../api/fetchApi";
import { apiUrl } from "../../../api/apiUrl";
import { AppConfig } from "../../../AppConfig";
import { TrendingNewsResponse } from "../../../types/Article";

const fetchApi = createFetch(apiUrl);

async function getAllNews({ queryKey, pageParam = 1 }: any): Promise<TrendingNewsResponse> {
  let { pageSize = 20 } = queryKey.slice(-1)[0];
  return await fetchApi<TrendingNewsResponse>(`/everything`, {
    queryParams: { 
      page: pageParam, 
      pageSize, 
      apiKey: AppConfig.API_KEY,
      q: "technology OR business OR sports OR entertainment OR health",
      sortBy: "publishedAt",
      language: "en"
    },
  }) as TrendingNewsResponse;
}

export default function useInfiniteNews(filters: any) {
  return useInfiniteQuery({
    queryKey: [...newsKeys.list(filters)],
    queryFn: getAllNews,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalResults = lastPage.totalResults;
      const totalPages = Math.ceil(totalResults / filters.pageSize);
      
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
