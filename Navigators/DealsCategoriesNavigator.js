import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DealsCategoriesScreen from "../assets/screens/Product/DealsCategories";
import CategoryStoreScreen from "../assets/screens/Product/CategoryStoreScreen";
import StoreScreen from "../assets/screens/Product/StoreScreen";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DealsCategories"
        component={DealsCategoriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
      name="CategoryStoreScreen" 
      component={CategoryStoreScreen}
      options={{
        headerShown: false,
      }} />
      <Stack.Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function DealsCategoriesNavigator() {
  return <MyStack />;
}
