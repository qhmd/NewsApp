import { formatDate } from "@/constants/formatDate"
import { StyleSheet, Text, View } from "react-native"

interface SmallTextNewsProps {
    author: string,
    timeUpload: any,
    styles: any
}

const SmallTextNews = ({ author, timeUpload, styles }: SmallTextNewsProps) => {
    const formatDatePublish = formatDate(timeUpload)
    return (
        <View>
            <Text style={[styles, stylesLocal.text]}>
                {author} - {formatDatePublish}
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