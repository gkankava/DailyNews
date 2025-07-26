export type Article = {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };

export type TrendingNewsResponse = {
    status: string;
    totalResults: number;
    articles: Article[];
  };