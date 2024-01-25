import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import LabCart from './LabCart';
import MedicineCart from './MedicineCart';

const heightStatus = StatusBar.currentHeight;

const CartContainer = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarItemStyle: {width: 200},
        tabBarStyle: {backgroundColor: 'powderblue'},
      }}>
      <Tab.Screen name="Medicine" component={MedicineCart} />
      <Tab.Screen name="Lab" component={LabCart} />
    </Tab.Navigator>
  );
};

export default CartContainer;

const styles = StyleSheet.create({});
