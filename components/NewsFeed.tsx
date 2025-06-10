import { Article } from "@/constants/api";
import { globalStyle } from "@/constants/globalStyle";
import { useAppThemes } from "@/hooks/useAppThemes";
import React from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import NewsItem from "./NewsItem";

interface NewsFeedProps {
    newsData: Article[]
    fetchMore: () => void,
    refresh : () => void,
    loading: boolean
}


const NewsFeed = ({ newsData, fetchMore, refresh, loading }: NewsFeedProps) => {
    
    const { theme } = useAppThemes()
    const styles = globalStyle(theme)

    const filteredNews = newsData.filter(article =>
        article.multimedia?.[2]?.url &&
        article.title &&
        article.byline &&
        article.published_date
    );

    const renderItem = ({ item }: any) => (
        <View>
            <NewsItem
                urlImage={item?.multimedia?.[2]?.url}
                title={item.title}
                author={item.byline}
                datePublish={item.published_date}
            />
            <View style={stylesLocal.divide} />
        </View>

    )
    // console.log("lihat isinya ",filteredNews[0].multimedia[0].url)
    return (
        <View style={styles.container}>
            <FlatList
                data={filteredNews}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={refresh}/>
                }
                ListFooterComponent={() => loading ? <ActivityIndicator size="large" color={'#eb1a2f'} /> : null}
                style={styles.container}
            />
        </View>
    )
}
const stylesLocal = StyleSheet.create({
    divide: {
        height: 2,
        marginVertical: 10,
        backgroundColor: 'gray'
    }
})
export default NewsFeed