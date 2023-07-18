import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, Text, StatusBar, TouchableOpacity,} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated, {  useSharedValue,  useAnimatedScrollHandler,  useAnimatedStyle,  interpolate,  Extrapolate,} from "react-native-reanimated";
import { Input, Center, NativeBaseProvider } from "native-base";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SearchedProduct from "./SearchedProducts";
import ProductList from "../Product/ProductList";

var { height } = Dimensions.get("window");

const data = require("../../data/products.json");
const productsCategories = require("../../data/products.json");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState(-1);
  const [initialState, setInitialState] = useState([]);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  

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

  const checkRememberSignIn = async () => {
    try {
      const rememberSignInValue = await AsyncStorage.getItem("rememberSignIn");
      console.log(rememberSignInValue);
      if (rememberSignInValue === "true") {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Error retrieving rememberSignIn value:", error);
    }
  };
  const storeRememberSignIn = async (value) => {
    try {
      await AsyncStorage.setItem("rememberSignIn", value.toString());
      console.log("Object stored");
    } catch (error) {
      console.log("Error storing rememberSignIn value:", error);
    }
  };

  

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(productsCategories);
    setProductsCtg(data);
    setActive(-1);
    setInitialState(data);
    checkRememberSignIn();
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const changeCtg = (ctg) => {
    if (ctg === "all") {
      setProductsCtg(initialState);
      setActive(-1);
    } else {
      setProductsCtg(products.filter((i) => i.category._id === ctg));
      setActive(-1);
    }
  };

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
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Animated.ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
            ]}
          >
            Welcome to Aleph Club!
          </Text>
        </View>

        <Center style={styles.center}>
          <Input
            fontFamily="Akkurat"
            placeholder=""
            borderRadius={50}
            height={9}
            alignContent="center"
            justifyContent="center"
            marginBottom={12}
            marginLeft={6}
            marginRight={6}
            backgroundColor="white"
            borderColor="black"
            onChangeText={(text) => searchProduct(text)}
            InputLeftElement={
              <TouchableOpacity onPress={openList}>
                <Ionicons
                  name="ios-search"
                  size={22}
                  color="#B3B3B3"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
            }
            InputRightElement={
              focus ? (
                <TouchableOpacity onPress={onBlur}>
                  <Ionicons
                    name="ios-close"
                    size={22}
                    color="#B3B3B3"
                    style={{ marginRight: 8 }}
                  />
                </TouchableOpacity>
              ) : null
            }
          />
        </Center>

        {focus ? (
          <SearchedProduct
            navigation={props.navigation}
            productsFiltered={productsFiltered}
          />
        ) : (
          <Animated.ScrollView
            style={styles.scrollView}
            onScroll={scrollHandler}
            scrollEventThrottle={8}
          >
            {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCtg.map((item) => (
                  <ProductList
                    navigation={props.navigation}
                    key={item.brand}
                    item={item}
                  />
                ))}
              </View>
            ) : (
              <View>
                <Text>Locations</Text>
              </View>
            )}
          </Animated.ScrollView>
        )}
      </Animated.ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
  header: {
    paddingTop: 160,
    position: "relative",
    backgroundColor: "black",
  },
  title: {
    position: "absolute",
    width: 136,
    color: "white",
    marginTop: 12,
    fontStyle: "normal",
    height: 60,
    left: 27,
    top: 74,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  scrollView: {
    flex: 2,
    transform: [{ translateY: -100 }],
    marginTop: 100,
  },
  listContainer: {
    paddingTop: 17,
    marginLeft: 27,
    paddingRight: 20,
    width: 380,
    backgroundColor: "#202020",
  },
  center: {
    borderBottomLeftRadius: 50,
    backgroundColor: "black",
  },
});

export default ProductContainer;
