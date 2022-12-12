import { StyleSheet, Text, View ,StatusBar} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import MedicineCart from './MedicineCart';
import LabCart from './LabCart';


const heightStatus = StatusBar.currentHeight;


const CartContainer = () => {
    const Tab = createMaterialTopTabNavigator();
  return (
        //   <SafeAreaView>
        //     <HomeTopTabs/>
        //   </SafeAreaView>
        <Tab.Navigator
        //add this
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: 'powderblue' },
        }}
        >
          <Tab.Screen name="Medicine" component={MedicineCart} />
          <Tab.Screen name="Lab" component={LabCart} />
        </Tab.Navigator>
        );
}

// function HomeTopTabs() {
//     const Tab = createMaterialTopTabNavigator();
//     return (
//         <Tab.Navigator
//         screenOptions={{
//           tabBarLabelStyle: { fontSize: 12 },
//           tabBarItemStyle: { width: 100 },
//           tabBarStyle: { backgroundColor: 'powderblue' },
//         }}
//         >
//           <Tab.Screen name="Medicine" component={MedicineCart} />
//           <Tab.Screen name="Lab" component={LabCart} />
//         </Tab.Navigator>
      
//     );
//   }


export default CartContainer

const styles = StyleSheet.create({})