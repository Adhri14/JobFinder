import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Home, Login, SignUp} from './pages';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Route;
