import { useQuery } from "@tanstack/react-query";

import createFetch from "../../../api/fetchApi";
import { apiUrl } from "../../../api/apiUrl";
import { AppConfig } from "../../../AppConfig";
import { TrendingNewsResponse } from "../../../types/Article";

const fetchApi = createFetch(apiUrl);

async function searchNews({ queryKey }: any): Promise<TrendingNewsResponse> {
  let { q, page = 1, pageSize = 20 } = queryKey.slice(-1)[0];
  
  if (!q || q.length < 3) {
    return {
      status: "ok",
      totalResults: 0,
      articles: []
    };
  }

  return await fetchApi<TrendingNewsResponse>(`/everything`, {
    queryParams: { 
      q, 
      page, 
      pageSize, 
      apiKey: AppConfig.API_KEY,
      sortBy: "publishedAt",
      language: "en"
    },
  }) as TrendingNewsResponse;
}

export default function useSearchNews(query: string) {
  return useQuery<TrendingNewsResponse>({
    queryKey: ['searchNews', { q: query }],
    queryFn: searchNews,
    enabled: query.length >= 3, // Only search when query has 3+ characters
  });
}
