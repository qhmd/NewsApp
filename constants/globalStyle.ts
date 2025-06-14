import { StyleSheet } from "react-native";
import { ColorThemeInterface } from "./Theme";

export const globalStyle = (theme: ColorThemeInterface) => {
    return (
        StyleSheet.create({
            container: {
                backgroundColor: theme.background,
                flex: 1,
            },
            textInput: {
                backgroundColor: theme.bgTextInput,
                borderColor: 'black',
                borderWidth: 0.5,
                paddingHorizontal: 15,
                marginHorizontal: 20,
                color: theme.text,
                marginTop: 8,
                borderRadius: 10,
            },
            featuredText: {
                color: theme.text,
            },

            categoryOnSelect: {
                color: theme.text,
                fontWeight: 'bold'
            },

            scrollViewKategory: {
                marginTop: 5,
                marginHorizontal: 2,
            },
            scrollViewItem: {
                color: theme.placeHolder,
                paddingVertical: 8,
                fontSize: 14,
                paddingHorizontal: 15,
            },
            indicatorView: {
                height: 2,
                backgroundColor: theme.primary
            },
            indicatorActiity: {
                color: 'eb1a2f'
            },
            card: {
                backgroundColor: theme.card,
                paddingVertical: 10,
                paddingHorizontal: 10
            },
            modalContent: {
                paddingVertical : 10,
                paddingLeft : 5,
                justifyContent: 'center',
                backgroundColor: theme.background
            }
        })
    )
}