/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import SaveImage from './SaveImage';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();
const Default_Screen_Options = ({ route, navigation }) => {
    return {
        headerLeft: null,
        headerTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#00bfbf' },
        headerTitleAlign: "center"
    };
};
const StackNavigator = () => (
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={Default_Screen_Options}
        headerMode="float"
    >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SaveImage" component={SaveImage}  />
    </Stack.Navigator>
);

export default StackNavigator;
