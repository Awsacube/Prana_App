import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ConfirmEmail from '../screens/ConfirmEmail';
import ForgotPass from '../screens/ForgotPassword';
import NewPass from '../screens/NewPassword';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="NewPass" component={NewPass} />
    </Stack.Navigator>
  );
};

export default AuthStack;
