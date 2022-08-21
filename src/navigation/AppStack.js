import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categories from '../screens/Categories';
import SubCategories from '../screens/SubCategories';
import CartContainer from '../screens/CartContainer';
import ProductItem from '../screens/ProductItem';
import PreviousOrders from '../screens/PreviousOrders';
import ProductDescription from '../screens/ProductDescription';
import Dummy from '../screens/Dummy';
import Location from '../screens/Location';
import Calltoorder from '../screens/Calltoorder';
import Profile from '../screens/Profile/Profile';
import TabNavigator from './TabNavigator';
import Test from '../screens/Diagnostics/Test';
import DoctorCard from '../screens/Doctors/DoctorCard';
import DoctorDetails from '../screens/Doctors/DoctorDetails';
import DocBySpecialization from '../screens/Doctors/DocBySpecialization';


const Stack=createNativeStackNavigator();

const AppStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="HomeScreen" component={TabNavigator}/>
      <Stack.Screen name="Location" component={Location}/>
      <Stack.Screen name="Calltoorder" component={Calltoorder}/>
      <Stack.Screen name='Profile' component={Profile}/>
      <Stack.Screen name='ProductItem' component={ProductItem}/>
      <Stack.Screen name='SubCategories' component={SubCategories}/>
      <Stack.Screen name='Categories' component={Categories}/>
      <Stack.Screen name='CartContainer' component={CartContainer}/>
      <Stack.Screen name='PreviousOrders' component={PreviousOrders}/>
      <Stack.Screen name='ProductDescription' component={ProductDescription}/>
      <Stack.Screen name='Test' component={Test}/>
      <Stack.Screen name='DoctorCard' component={DoctorCard}/>
      <Stack.Screen name='DocBySpecialization' component={DocBySpecialization}/>
      <Stack.Screen name='DoctorDetails' component={DoctorDetails}/>      
      </Stack.Navigator>
  )
}

export default AppStack;