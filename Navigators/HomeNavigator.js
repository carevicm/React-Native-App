import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";

import ProductContainer from "../assets/screens/Product/ProductContainer";
import StoreScreen from "../assets/screens/Product/StoreScreen";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ProductContainer}
        options={{
          headerShown: false,
        }}
      />
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

export default function HomeNavigator() {
  return <MyStack />;
}
