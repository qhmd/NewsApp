import NewsFeed from "@/components/NewsFeed";
import { useEffect } from "react";
import useNewsStore from './store';

const AllNews = () => {
    const {news, loading, error, fetchNews } = useNewsStore()
    
    useEffect(() => {
        fetchNews()
    }, [fetchNews])
    return(
            <NewsFeed
                newsData={news} 
            />    
    )
}

export default AllNews