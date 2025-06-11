import { Article } from "@/constants/api";
import { globalStyle } from "@/constants/globalStyle";
import { useAppThemes } from "@/hooks/useAppThemes";
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useRef, useState } from "react";
import { ActivityIndicator, FlatList, Modal, RefreshControl, StyleSheet, View } from "react-native";
import WebView, { WebView as WebViewType } from "react-native-webview";
import NewsItem from "./NewsItem";

interface NewsFeedProps {
    newsData: Article[]
    fetchMore: () => void,
    refresh: () => void,
    loading: boolean
}


const NewsFeed = ({ newsData, fetchMore, refresh, loading }: NewsFeedProps) => {
    const { theme } = useAppThemes()
    const webViewref = useRef<WebViewType>(null)

    const styles = globalStyle(theme)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalUrl, setModalUrl] = useState<string | null>(null)

    const filteredNews = newsData.filter(article =>
        article.multimedia?.[2]?.url &&
        article.title &&
        article.byline &&
        article.url &&
        article.published_date
    );

    const handleWebViewNavigationChange = (newNavState: any) => {
        const { url } = newNavState;
        if (!url) return;

        if (url.includes('.pdf')) {
            webViewref.current?.stopLoading()
        }

        if (url.includes('?message=success')) {
            webViewref.current?.stopLoading();
        }

        if (url.includes('?errors=true')) {
            webViewref.current?.stopLoading();
        }

        if (url.includes('google.com')) {
            const newURL = 'https://reactnative.dev/';
            const redirectTo = 'window.location = "' + newURL + '"';
            webViewref.current?.injectJavaScript(redirectTo);
        }
    }

    const onModalOpen = (url: string): void => {
        setIsModalVisible(true)
        console.log("di klik", url)
        setModalUrl(url)
    }

    const onModalClose = () => {
        setIsModalVisible(false)
    }

    const renderModal = () => {
        return (
            <Modal
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={onModalClose}
            >
                <View style={styles.modalContent}>
                    <Ionicons name="chevron-back" size={28} style={stylesLocal.backIcons} onPress={onModalClose} color={styles.featuredText.color} />
                </View>
                {modalUrl && (
                    <WebView
                        source={{ uri: modalUrl }}
                        onNavigationStateChange={handleWebViewNavigationChange}
                    />
                )}

            </Modal>
        )
    }

    const renderItem = ({ item }: any) => (
        <View>
            <NewsItem
                urlImage={item?.multimedia?.[2]?.url}
                title={item.title}
                author={item.byline}
                onPress={() => onModalOpen(item.url)}
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
                    <RefreshControl refreshing={loading} onRefresh={refresh} colors={['#eb1a2f']} progressBackgroundColor={'white'} />
                }
                ListFooterComponent={() => loading ? <ActivityIndicator size="large" color={'#eb1a2f'} /> : null}
                style={styles.container}
            />
            {renderModal()}
        </View>
    )
}
const stylesLocal = StyleSheet.create({
    divide: {
        height: 2,
        marginVertical: 10,
        backgroundColor: 'gray'
    },
    backIcons : {
        width : 30
    }
})
export default NewsFeed