const API_KEY = "gtORzHRECZwa9jePeHX6R2a4wQfzOz5q";
const BASE_URL = "http://api.nytimes.com/svc/news/v3/content/all/all.json";

export interface Article {
  title: string;
  byline: string;
  published_date: string;
  multimedia: {
    url: string;
  }[];
  url: string
}

export interface FetchArticlesResponse {
  results: Article[];
  num_results: number;
  status: string;
  copyright: string;
}


const getRandomOffset = () => {
  const offsets = Array.from({ length: 25 }, (_, i) => i * 20);
  const randomIndex = Math.floor(Math.random() * offsets.length);
  return offsets[randomIndex];
};


export const getnewsFromApi = async (
  offset: number,
  limit: number = 20
): Promise<Article[]> => {
  try {
    console.log("Mulai fetch data dari NYT...");

    const res = await fetch(
      `${BASE_URL}?limit=${limit}&offset=${offset}&api-key=${API_KEY}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: FetchArticlesResponse = await res.json();

    return data.results;
  } catch (error) {
    console.error("GAGAL FETCH!", error);
    throw new Error("Failed to fetch articles");
  }
};

export const getRandomNews = async (): Promise<Article[]> => {
  const offset = getRandomOffset();
  return getnewsFromApi(offset);
};