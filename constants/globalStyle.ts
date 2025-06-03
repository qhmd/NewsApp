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

        })
    )
}