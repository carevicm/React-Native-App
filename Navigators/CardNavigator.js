import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import CardScreen from "../assets/screens/Product/MembershipCard";
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="CardScreen"
                component={CardScreen}
                options={{
                    headerShown: false
                }}
            />
             
        </Stack.Navigator>
    )
}

export default function CardNavigator() {
    return <MyStack />
}