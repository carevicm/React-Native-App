import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens
import Main from "./Navigators/Main";
import WelcomeNavigator from "./Navigators/WelcomeNavigator";

const ToastProvider = () => {
  useEffect(() => {
    // Set up any necessary configurations for the Toast component
  }, []);

  return <Toast />;
};

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
    const checkRememberSignIn = async () => {
      try {
        const rememberSignInValue = await AsyncStorage.getItem("rememberSignIn");
        console.log(rememberSignInValue);
        if (rememberSignInValue === "true") {
          //setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Error retrieving rememberSignIn value:", error);
      }
    };
    //setIsAuthenticated(true);

    //checkRememberSignIn();
    //storeRememberSignIn(false);
    console.log("App.js isAuthenticated: "+isAuthenticated);

    
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
      {isAuthenticated ? <Main/> : <WelcomeNavigator/>}
        <ToastProvider />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}