import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons} from "@expo/vector-icons";
import * as Font from "expo-font";
import Animated, {  useSharedValue,  useAnimatedScrollHandler,  useAnimatedStyle,  interpolate,  Extrapolate,} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import data from "../DataStores/Privacydocs.json";

const DataPrivacyScreen = ({ route }) => {
    const { title, description } = route.params;
    const [fontLoaded, setFontLoaded] = useState(false);
    const navigation = useNavigation();
  
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
            translateY: interpolate(scrollY.value, [0, 200], [0, -200]),
          },
        ],
      };
    });
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.backButton,
              { fontFamily: fontLoaded ? "AkkuratBold" : undefined },
            ]}
          >
            <Ionicons name="arrow-back" size={37} color="black" />
          </TouchableOpacity>
        </View>
  
        <View style={{ flex: 1 }}>
        <Animated.ScrollView
  onScroll={scrollHandler}
  scrollEventThrottle={16}
  contentContainerStyle={{ padding: 20, paddingBottom: 200 }}
>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              {title}
            </Text>
            <Text>{description}</Text>
          </Animated.ScrollView>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    backButton: {
      position: "absolute",
      top: 20,
      zIndex: 1,
      left: 15,
    },
    header: {
      paddingTop: 90,
      backgroundColor: "white",
    },
  });
  
  export default DataPrivacyScreen;