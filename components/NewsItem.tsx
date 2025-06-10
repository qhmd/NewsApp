import { globalStyle } from "@/constants/globalStyle";
import { useAppThemes } from "@/hooks/useAppThemes";
import { TouchableOpacity, View } from "react-native";
import ImageNews from "./ImageNews";
import SmallTextNews from "./SmallTextNews";
import Title from "./Title";

export interface NewsItemProps {
  title: string;
  urlImage: string;
  author: string;
  datePublish: any;
}

const NewsItem = ({ title, urlImage, author, datePublish }: NewsItemProps) => {
  const { theme } = useAppThemes();
  const styles = globalStyle(theme);
  return (
    <TouchableOpacity style={styles.card}>
      <ImageNews urlImage={urlImage} />
      <View >
        <Title styles={styles.featuredText}>{title}</Title>
        <SmallTextNews styles={styles.featuredText} author={author} timeUpload={datePublish} />
      </View>
    </TouchableOpacity>
  );
};



export default NewsItem;
