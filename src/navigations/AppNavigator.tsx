import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard } from '../screens/dashboard/Dashboard';
import { AddProductScreen } from '../screens/AddProductScreen/AddProductScreen';
import { ViewAllProductsScreen } from '../screens/ViewAllProductsScreen/ViewAllProductsScreen';

const Stack = createNativeStackNavigator();
console.log("AddProductScreen:", AddProductScreen);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false }}
        />
        <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{headerShown: false }}/>
        <Stack.Screen name="ViewAllProductsScreen" component={ViewAllProductsScreen} options={{headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;