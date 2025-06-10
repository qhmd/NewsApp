import { StyleSheet, Text, View } from "react-native"
interface SmallTextNewsProps {
    author: string,
    timeUpload: any,
    styles: any
}

const SmallTextNews = ({ author, timeUpload, styles }: SmallTextNewsProps) => {
    return (
        <View>
            <Text style={[styles, stylesLocal.text]}>
                {author} - {timeUpload}
            </Text>
        </View>
        )
}

const stylesLocal = StyleSheet.create({
    text: {
        marginTop: 5,
        fontFamily: 'HelveticaNeue-CondensedBold',
        fontSize: 11
    }
})

export default SmallTextNews