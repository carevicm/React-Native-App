import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../assets/screens/UserPage/Welcome";
import SignIn from "../assets/screens/UserPage/SignIn";
import SignUp from "../assets/screens/UserPage/SignUp";
import Main from "./Main";
const Stack = createStackNavigator();

const WelcomeNavigator = () => {


    return (
        <Stack.Navigator>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
        </Stack.Navigator>
      );
}




export default WelcomeNavigator;