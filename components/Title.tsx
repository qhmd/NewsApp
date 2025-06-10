import { StyleSheet, Text } from "react-native"

interface TitleProps{
    children : string,
    styles: any
}


const Title = ({children, styles} : TitleProps )=> {
    return (
        <Text style={[styles, stylesLocal.title]}>
            {children}
        </Text>
    )
}

const stylesLocal = StyleSheet.create({
        title : {
        fontWeight: 'bold',
        fontFamily: 'HelveticaNeue-CondensedBold',
        fontSize : 17,
        marginTop: 5
    }
})

export default Title