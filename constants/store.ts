import { create } from "zustand";
import { Article, getnewsFromApi, getRandomNews } from "./api";

interface NewsState {
    news: Article[];
    loading: boolean;
    offset: number;
    hasMore: boolean;
    fetchNews: () => Promise<void>;
    refreshRandom: () => Promise<void>;
}

const useNewsStore = create<NewsState>((set, get) => ({
    news: [],
    loading: false,
    offset: 0,
    hasMore: true,
    fetchNews: async () => {
        const { offset, news, loading, hasMore } = get();
        if (loading || !hasMore) return
        set({ loading: true })

        try {
            const newArticles = await getnewsFromApi(offset)
            set({
                news: [...news, ...newArticles],
                offset: offset + 20,
                hasMore: newArticles.length === 20
            })
        } catch (err) {
            console.log(err)
        } finally {
            set({ loading: false })
        }
    },
    refreshRandom: async () => {
        try {
            set({ loading: true });
            const data = await getRandomNews();
            set({ 
                news: data, 
                offset: 0,
                hasMore: data.length === 20
            });
        } catch (e) {
            console.error("Failed to refresh randomly", e);
        } finally {
            set({ loading: false });
        }
  }
}));

export default useNewsStore