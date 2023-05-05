import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Diagnostics from '../screens/Diagnostics/Diagnostics';
import Doctors from '../screens/Doctors/Doctors';
import Profile from '../screens/Profile/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
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
              iconName = focused ? 'doctor' : 'doctor';
            } 
            else if (route.name === 'Lab Tests'){
              iconName = focused ? 'test-tube' : 'test-tube';
            }
            else if (route.name === 'Account'){
              iconName = focused ? 'account' : 'account';
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#E73631',
          tabBarInactiveTintColor: '#000',
        //   tabBarShowLabel:false,
        })
      }>
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Appointments" component={Doctors}/>
        <Tab.Screen name="Lab Tests" component={Diagnostics}/>
        <Tab.Screen name="Account" component={Profile} options={{ unmountOnBlur: true }}
/>
      </Tab.Navigator>
  )
}

export default TabNavigator