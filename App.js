/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useCallback, useContext, useEffect, useState} from 'react';
//  import {AuthContext} from './src/auth/AuthContext';
import * as Keychain from 'react-native-keychain';
import {createRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
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
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import ConfirmEmail from './src/screens/ConfirmEmail';
import ForgotPass from './src/screens/ForgotPassword';
import NewPass from './src/screens/NewPassword';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Diagnostics from './src/screens/Diagnostics/Diagnostics';
import Doctors from './src/screens/Doctors/Doctors';
import Profile from './src/screens/Profile/Profile';
import Calltoorder from './src/screens/Calltoorder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Categories from './src/screens/Categories';
import SubCategories from './src/screens/SubCategories';
import ProductItem from './src/screens/ProductItem';
import PreviousOrders from './src/screens/OrderHistory';
import ProductDescription from './src/screens/ProductDescription';
import dummy from './src/screens/Dummy';
import Dummy from './src/screens/Dummy';
import isSignedIn from './src/screens/Signin';
import Location from './src/screens/Location';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import {getToken} from './src/services/AsyncStorageService';
import {useDispatch, useSelector} from 'react-redux';
import AppNav from './src/navigation/AppNav';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  // const isSignedIn=useSelector((state)=>state.auth.isSignedIn)

  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNav />
    </SafeAreaProvider>
    // <NavigationContainer>
    // <AppStack/>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
