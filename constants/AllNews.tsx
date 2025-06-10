import NewsFeed from "@/components/NewsFeed";
import { useEffect } from "react";
import useNewsStore from './store';

const AllNews = () => {
    const {news, loading, fetchNews, refreshRandom } = useNewsStore()
    
    useEffect(() => {
        fetchNews()
    }, [fetchNews])
    return(
            <NewsFeed
                newsData={news}
                fetchMore={fetchNews}
                loading={loading}
                refresh={refreshRandom}
            />    
    )
}

export default AllNews