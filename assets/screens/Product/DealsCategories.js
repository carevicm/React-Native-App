import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, Text, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { NativeBaseProvider } from 'native-base';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

var { height } = Dimensions.get("window");

import data from "../../data/categories.json";

import CategoryStoreScreen from "./CategoryStoreScreen";

const DealsCategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Akkurat: require("../../fonts/Akkurat.ttf"),
        AkkuratBold: require("../../fonts/Akkurat-Bold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    setCategories(data);
  }, []);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const translateY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 200],
            [0, -200],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const handleCategoryPress = (category) => {
    const selectedCategory = categories.find(
      (cat) => cat.name.toLowerCase() === category.name.toLowerCase()
    );
    setSelectedCategory(selectedCategory);
    navigation.navigate("CategoryStoreScreen", { category: selectedCategory.name });
  };
  

  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
          ]}
        >
          Deals Categories
        </Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryContainer}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={styles.categoryName}>{category.name}</Text>
              <FontAwesome name="angle-right" size={25} color="white" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    paddingTop: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 10,
    marginTop: 70,
  },
  scrollViewContent: {
    paddingTop: 5,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17.5,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  categoryName: {
    flex: 1,
    color: "#D9D9D9",
    fontSize: 19,
    marginRight: 5,
    fontFamily: "Akkurat"
  },
  categoryArrow: {
    color: "white",
    fontSize: 16,
  },
});


export default DealsCategoriesScreen;

