import { globalStyle } from "@/constants/globalStyle";
import { useAppThemes } from "@/hooks/useAppThemes";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import NewsItem from "./NewsItem";

interface NewsFeedProps {
    newsData: Object[]
}


const NewsFeed = ({ newsData }: NewsFeedProps) => {
    const { theme } = useAppThemes()
    const styles = globalStyle(theme)

    const renderItem = ({ item }: any) => (
        <View>
            <NewsItem
                urlImage={item?.multimedia?.[0]?.url}
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
                data={newsData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={styles.card}
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