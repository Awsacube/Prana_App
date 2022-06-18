/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React,{useCallback, useContext, useEffect, useState} from 'react';
//  import {AuthContext} from './src/auth/AuthContext';
 import * as Keychain from 'react-native-keychain';
 import { 
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import ConfirmEmail from './src/screens/ConfirmEmail';
import ForgotPass from './src/screens/ForgotPassword';
import NewPass from './src/screens/NewPassword';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Diagnostics from './src/screens/Diagnostics/Diagnostics';
import Doctors from './src/screens/Doctors/Doctors';
import Profile from './src/screens/Profile/Profile';
import Calltoorder from './src/screens/Calltoorder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Search from './src/screens/Search';
import Categories from './src/screens/Categories';
import SubCategories from './src/screens/SubCategories';
import CartContainer from './src/screens/CartContainer';
import ProductItem from './src/screens/ProductItem';
import PreviousOrders from './src/screens/PreviousOrders';
import ProductDescription from './src/screens/ProductDescription';
import dummy from './src/screens/Dummy';
import Dummy from './src/screens/Dummy';
import isSignedIn from './src/screens/Signin';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={
      ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'reorder-four-sharp' : 'reorder-four-sharp';
          } 
          else if (route.name === 'Lab'){
            iconName = focused ? 'cart' : 'cart';
          }
          else if (route.name === 'Account'){
            iconName = focused ? 'cart' : 'cart';
          }


          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'green',
      })
    }>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Appointments" component={Doctors} options={{headerShown: false}} />
      <Tab.Screen name="Lab" component={Diagnostics} options={{headerShown: false}}/>
      <Tab.Screen name="Account" component={Profile} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

const Stack=createNativeStackNavigator();

const App = () => {
    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Homescreen" screenOptions={{
    headerShown: false
  }}> 
      <Stack.Screen name="Signin" component={Signin}/>
      <Stack.Screen name='Search' component={Search}/>
      <Stack.Screen name="HomeScreen" component={MyTabs}/>
      <Stack.Screen name="Signup" component={Signup}/>  
      <Stack.Screen name="Calltoorder" component={Calltoorder}/>
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmail}/>
      <Stack.Screen name="ForgotPass" component={ForgotPass}/>
      <Stack.Screen name="NewPass" component={NewPass}/>
      <Stack.Screen name='Profile' component={Profile}/>
      <Stack.Screen name='ProductItem' component={ProductItem}/>
      <Stack.Screen name='SubCategories' component={SubCategories}/>
      <Stack.Screen name='Categories' component={Categories}/>
      <Stack.Screen name='CartContainer' component={CartContainer}/>
      <Stack.Screen name='PreviousOrders' component={PreviousOrders}/>
      <Stack.Screen name='ProductDescription' component={ProductDescription}/>
      <Stack.Screen name='Dummy' component={Dummy}/>
      </Stack.Navigator>
  </NavigationContainer>
    )
};

const styles = StyleSheet.create({
   
});

export default App;