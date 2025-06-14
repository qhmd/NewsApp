import { Image, StyleSheet } from "react-native";

interface ImageNewsProps {
    urlImage: string;
}

const ImageNews = ({ urlImage }: ImageNewsProps) => {
    return (
        <Image
            source={{ uri: urlImage }}
            style={styles.image}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150
    }
})

export default ImageNews