import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Box, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Fontisto } from "@expo/vector-icons";
import * as Font from "expo-font";

// Stack
import HomeNavigator from "./HomeNavigator";
import CardNavigator from "./CardNavigator";
import DealsCategoriesNavigator from "./DealsCategoriesNavigator";
import UserNavigator from "./UserNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Akkurat: require("../assets/fonts/Akkurat.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <Tab.Navigator
    initialRouteName="Main"
    screenOptions={{
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: "#A59449",
      tabBarInactiveTintColor: "white",
      tabBarShowLabel: true,
      headerShown: false,
      tabBarStyle: {
        display: "flex",
        backgroundColor: "#202020",
        paddingBottom: 20,
        paddingTop: 5,
        borderTopWidth: 1.2,
        borderTopColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        height: 80,
       
      },
    }}
    >
      <Tab.Screen
        name="Explore"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="globe" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Deals"
        component={DealsCategoriesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="th-list" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Card"
        component={CardNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="credit-card" color={color} size={22} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user-alt" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
