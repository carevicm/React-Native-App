import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AsyncStorage from "@react-native-async-storage/async-storage";


import UserProfileScreen from "../assets/screens/UserPage/Profile";
import DataPrivacyScreen from "../assets/screens/DataStores/DataPrivacyScreen";
import VisitHistoryScreen from "../assets/screens/DataStores/VisitHistoryScreen";


const Stack = createStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => null, // Hide the profile icon
          }}
        />    
        <Stack.Screen
          name="DataPrivacyScreen"
          component={DataPrivacyScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => null, // Hide the profile icon
          }}
        />    
        <Stack.Screen
          name="VisitHistoryScreen"
          component={VisitHistoryScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => null, // Hide the profile icon
          }}
        />    


    </Stack.Navigator>
  );
}

export default UserNavigator;
