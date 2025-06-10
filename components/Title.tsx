import { StyleSheet, Text } from "react-native"

interface TitleProps{
    children : string,
    styles: any
}


const Title = ({children, styles} : TitleProps )=> {
    return (
        <Text style={[styles, stylesLocal]}>
            {children}
        </Text>
    )
}

const stylesLocal = StyleSheet.create({
        title : {
        fontFamily: 'HelveticaNeue-CondensedBold',
        fontSize : 20,
    }
})

export default Title