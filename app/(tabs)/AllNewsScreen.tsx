import { globalStyle } from "@/constants/globalStyle";
import { useAppThemes } from "@/hooks/useAppThemes";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

type Category = string;

const AllNewsScreen = () => {
  const { theme } = useAppThemes();
  const styles = globalStyle(theme);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
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

  const stylesLocal = StyleSheet.create({
    container: {
      paddingVertical: 10,
    },
    categoryContainer: {
      position: "relative",
    },
    scrollContainer: {
      position: "relative",
    },
    optionWrapper: {
      marginHorizontal: 8,
    },
    option: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 2,
    },
    optionText: {
      fontSize: 14,
      color: theme.placeHolder,
    },
    activeText: {
      color: "#fff",
      fontWeight: "bold",
    },
    indicator: {
      position: "absolute",
      bottom: 0,
      height: 3,
      backgroundColor: theme.primary,
      borderRadius: 2,
    },
    indicatorContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0, 
      height: 3,
      overflow: "hidden",
    },
  });

  // Ref untuk posisi dan lebar tiap item kategori
  const itemLayouts = useRef<{ x: number; width: number }[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollOffset = useRef(0);

  // Animated value untuk posisi dan lebar indikator
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  console.log("Lebar width " , indicatorWidth)
  // Animated value untuk scale tiap item kategori
  const scaleAnim = useRef(
    kategori.map(() => new Animated.Value(1))
  ).current;

  const updateIndicatorPosition = (index: number, animate: boolean = true) => {
    const layout = itemLayouts.current[index];
    console.log("Item layout : " , itemLayouts.current)
    console.log("Item layout : " , layout)

    if (layout) {
      // Posisi indikator = posisi item - scroll offset
      const indicatorPos = layout.x - scrollOffset.current;
      
      if (animate) {
        Animated.parallel([
          Animated.spring(indicatorPosition, {
            toValue: indicatorPos,
            useNativeDriver: false,
            tension: 100,
            friction: 100,
          }),
          Animated.spring(indicatorWidth, {
            toValue: layout.width,
            useNativeDriver: false,
            tension: 100,
            friction: 100,
          })
        ]).start();
      } else {
        // Update tanpa animasi untuk scroll
        indicatorPosition.setValue(indicatorPos);
        indicatorWidth.setValue(layout.width);
      }
    }
  };

  useEffect(() => {
    // Set initial position setelah component mount
    setTimeout(() => {
      if (itemLayouts.current[0]) {
        updateIndicatorPosition(0);
        Animated.spring(scaleAnim[0], {
          toValue: 1.1,
          useNativeDriver: true,
        }).start();
      }
    }, 100);
  }, []);

  const handleCategorySelected = (category: Category, index: number) => {
    setSelectedCategory(category);
    setSelectedIndex(index);
    console.log(category, index)
    // Update dengan animasi saat kategori dipilih
    updateIndicatorPosition(index, true);

    // Scale naik 1.1 untuk yang aktif
    Animated.spring(scaleAnim[index], {
      toValue: 1.2,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();

    // Scale kembali ke 1 untuk item lain
    scaleAnim.forEach((anim, i) => {
      if (i !== index) {
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    });
  };

  const onScroll = (event: any) => {
    scrollOffset.current = event.nativeEvent.contentOffset.x;
    // console.log("ssekarang di ", event.nativeEvent.contentOffset)
    // Update posisi indikator tanpa animasi saat scroll untuk menghindari bounce
    updateIndicatorPosition(selectedIndex, false);
  };

  const onItemLayout = (event: any, index: number) => {
    const { x, width } = event.nativeEvent.layout;
    console.log("nilai native event ", event.nativeEvent.layout)
    itemLayouts.current[index] = { x, width };
    
    // Jika ini item terpilih dan belum diset, set posisi awal
    if (index === selectedIndex) {
      setTimeout(() => updateIndicatorPosition(index), 50);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Cari berita favorit anda"
        placeholderTextColor={theme.placeHolder}
        autoCorrect={true}
      />

      <View style={stylesLocal.categoryContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={stylesLocal.scrollContainer}
        >
          {kategori.map((item, index) => {
            const isActive = index === selectedIndex;
            return (
              <TouchableOpacity
                key={item}
                onPress={() => handleCategorySelected(item, index)}
                style={stylesLocal.optionWrapper}
                onLayout={(event) => onItemLayout(event, index)}
              >
                <Animated.View
                  style={[
                    stylesLocal.option ,
                    isActive &&
                    {
                      transform: [{ scale: scaleAnim[index] }],
                    },
                  ]}
                >
                  <Text
                    style={[
                      stylesLocal.optionText,
                      isActive && stylesLocal.activeText,
                    ]}
                  >
                    {item}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        
        {/* Container indikator yang terpisah dari scroll */}
        <View style={stylesLocal.indicatorContainer}>
          <Animated.View
            style={[
              stylesLocal.indicator,
              {
                width: indicatorWidth,
                left: indicatorPosition,
              },
            ]}
          />
        </View>
      </View>

      <Text style={{ color: theme.text, marginTop: 20 }}>Featured</Text>
    </View>
  );
};

export default AllNewsScreen;