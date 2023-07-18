import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const CategoryStoreScreen = ({ route }) => {
  const { category } = route.params;
  const [stores, setStores] = useState([]);
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Load the store data from the local JSON file
    const jsonData = require("../../data/products.json");
    const filteredStores = jsonData.filter((store) => store.category === category);
    setStores(filteredStores);
  }, [category]);

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

  const navigateToProductDetail = (selectedItem) => {
    navigation.navigate("StoreScreen", { item: selectedItem });
  };

  const renderImageRows = () => {
    const rows = [];
    let row = [];
    for (let i = 0; i < stores.length; i++) {
      const currentItem = stores[i];
      if (currentItem && currentItem.image) {
        row.push(
          <TouchableOpacity
            key={currentItem._id}
            style={styles.storeContainer}
            onPress={() => navigateToProductDetail(currentItem)}
          >
            {currentItem.image && (
              <Image
                source={{ uri: currentItem.image }}
                resizeMode="cover"
                style={styles.storeImage}
              />
            )}
          </TouchableOpacity>
        );
      }
      if ((i + 1) % 3 === 0 || i === stores.length - 1) {
        rows.push(
          <View key={i} style={styles.imageRow}>
            {row}
          </View>
        );
        row = [];
      }
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#202020" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backButton,
            { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
          ]}
        >
          <Ionicons name="arrow-back" size={37} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.categoryText}>{category}</Text>
          <View style={styles.underline} />
        </View>
      </View>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={8}
      >
        <View style={styles.middleSection}>{renderImageRows()}</View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
  backButton: {
    position: "absolute",
    left: 10,
    bottom: 60,
    zIndex: 1,
  },
  header: {
    paddingTop: 110,
    backgroundColor: "#202020",
  },
  categoryText: {
    color: "#D9D9D9",
    fontSize: 19,
    fontWeight: "200",
    marginLeft: 20,
    fontFamily: "Akkurat",
    bottom: 20,
  },
  underline: {
    position: "absolute",
    backgroundColor: "white",
    height: 1,
    width: "90%",
    bottom: 5,
    left: 20,
    marginRight: 20,
  },
  middleSection: {
    backgroundColor: "#202020",
    marginTop: 20,
   
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    marginHorizontal: 15,
    
  },
  storeContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
   
  },
  storeImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: "white",
    resizeMode: "cover",
  },
  scrollView: {
    flex: 2,
    transform: [{ translateY: -100 }],
    marginTop: 100,
  },
});

export default CategoryStoreScreen;
