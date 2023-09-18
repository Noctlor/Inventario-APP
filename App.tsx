import { View, Text } from 'react-native'
import React from 'react'
import Login from './src/Screen/login'
import Dashboard from './src/Screen/dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import Adminpanel from './src/Screen/adminpanel';
import FormProduct from './src/Components/FomProduct';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Adminpanel : undefined;
  FormProduct: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export type AppNavigationProps<RouteName extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}  options={{ title: 'ProinSur' }}/>
        <Stack.Screen name="Adminpanel" component={Adminpanel} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="FormProduct" component={FormProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App