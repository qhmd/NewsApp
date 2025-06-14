import { FakeApi } from "@/constants/FakeApi";
import { globalStyle } from "@/constants/globalStyle";
import { useAppThemes } from "@/hooks/useAppThemes";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const AllNewsScreen = () => {
  const { theme } = useAppThemes();
  const styles = globalStyle(theme);
  const kategori: string[] = [
    "All",
    "Football",
    "Food",
    "Health",
    "Game",
    "Blsas",
    "Blas",
    "Basss",
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [componentToRender, setComponentToRender] = useState<React.ReactNode>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const scaleAnim = useRef(
    kategori.map(() => new Animated.Value(1))
  ).current
  const itemLayouts = useRef<{ x: number; width: number }[]>([]);
  const scrollViewref = useRef<ScrollView>(null)
  const scrollOffset = useRef(0)

  const indicatorWidth = useRef(new Animated.Value(0)).current
  const indicatorPosition = useRef(new Animated.Value(0)).current

  useEffect(() => {
    console.log("Di use effect", selectedCategory)
    if (itemLayouts.current[0]) {
      onUpdateIndicator(0)
      Animated.spring(scaleAnim[0], {
        toValue: 1.2,
        useNativeDriver: true
      }).start()
    }
    onUpdateIndicator(selectedIndex, true)
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      const newComponent: React.JSX.Element = FakeApi(selectedCategory);
      setComponentToRender(newComponent)
    }
  }, [selectedCategory]);

  const scaleAnimStart = (index: number) => {
    Animated.spring(scaleAnim[index], {
      toValue: 1.2,
      tension: 100,
      friction: 10,
      useNativeDriver: true
    }).start()
  }

  const normalScale = (index: number) => {
    console.log("isi normal scale", scaleAnim, index)
    scaleAnim.forEach((anim, i) => {
      if (i != index) {
        Animated.spring(anim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true
        }).start()
      }
    })
  }

  const handlePress = (kategori: string, index: number): void => {
    setSelectedCategory(kategori)
    scaleAnimStart(index)
    setSelectedIndex(index)
    normalScale(index)
    onUpdateIndicator(index, true)
    console.log(kategori, index)
  }


  const onItemLayout = (event: any, index: number) => {
    const { width, x } = event.nativeEvent.layout
    console.log("nilai x adalah", event.nativeEvent.layout)
    itemLayouts.current[index] = { width, x };
  }

  const onScroll = (event: any): void => {
    scrollOffset.current = event.nativeEvent.contentOffset.x
    onUpdateIndicator(selectedIndex, false)
  }

  const onUpdateIndicator = (index: number, animated: boolean = true): void => {
    const layout = itemLayouts.current[index];
    console.log("scroll offset", layout)
    if (layout) {
      const indicatorPos = layout.x - scrollOffset.current
      if (animated) {
        Animated.parallel([
          Animated.spring(indicatorPosition, {
            toValue: indicatorPos,
            useNativeDriver: false,
            tension: 100,
            friction: 100 // Perhatikan nilai friction yang jauh lebih tinggi
          }),
          Animated.spring(indicatorWidth, {
            toValue: layout.width,
            useNativeDriver: false,
            tension: 100,
            friction: 100, // Perhatikan nilai friction yang jauh lebih tinggi
          })
        ]).start()
      } else {
        indicatorPosition.setValue(indicatorPos)
        indicatorWidth.setValue(layout.width)
      }
    }
    console.log("Item layout : ", layout)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Cari berita favorit anda"
        placeholderTextColor={theme.placeHolder}
        autoCorrect={true}
      />
      <View>
        <ScrollView
          horizontal={true}
          ref={scrollViewref}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
        >
          {kategori.map((item, index) => {
            const isActive = selectedCategory === item
            return (
              <TouchableOpacity
                style={styles.scrollViewKategory}
                key={index}
                onPress={() => handlePress(item, index)}
                onLayout={(event) => onItemLayout(event, index)}
              >
                <Animated.View style={selectedCategory && { transform: [{ scale: scaleAnim[index] }] }}>
                  <Text style={[styles.scrollViewItem, isActive && styles.categoryOnSelect]}>{item}</Text>
                </Animated.View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <Animated.View
          style={[styles.indicatorView, { width: indicatorWidth, left: indicatorPosition }]}
        />

      </View>
      <View style={styles.container}>
        {selectedCategory ? (
          <View style={{flex:1}}>
            {componentToRender}
          </View>
        ) :
          <Text>Silahkan Pilih Kategori</Text>
        }
      </View>
    </View>
  );
};

export default AllNewsScreen;