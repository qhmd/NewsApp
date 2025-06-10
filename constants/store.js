import { create } from "zustand";
import { getnewsFromApi } from "./api";

const useNewsStore = create((set) => ({
    news: [],
    loading: false,
    error: null,
    fetchNews: async () => {
        set({loading:true, error: null})
        try {
            const articles = await getnewsFromApi()
            set({news : articles.results})
        } catch (err) {
        set({ error: 'Gagal mengambil data berita' })
        } finally {
        set({ loading: false })
        }
    }
}))

export default useNewsStore