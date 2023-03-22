import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categories from '../screens/Categories';
import SubCategories from '../screens/SubCategories';
import MedicineCart from '../screens/MedicineCart';
import ProductItem from '../screens/ProductItem';
import OrderHistory from '../screens/OrderHistory';
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
import AllTests from '../screens/Diagnostics/AllTests';
import AllPackages from '../screens/Diagnostics/AllPackages';
import TestsAndPackagesById from '../screens/Diagnostics/TestsAndPackagesById';
import DiagSearch from '../screens/Diagnostics/DiagSearch';
import DocSearch from '../screens/Doctors/DocSearch'
import EmptyPage from '../screens/EmptyPage';
import EditProfile from '../screens/Profile/EditProfile';
import CartContainer from '../screens/CartContainer';
import LabCart from '../screens/LabCart';
import Splash from '../screens/Splash';
import TestsByFilter from '../screens/Diagnostics/TestsByFilter';
import FeaturedBrands from '../screens/FeaturedBrands';
import FeaturedBrandItems from '../screens/FeaturedBrandItems';
import WishList from '../screens/wishlist';


const Stack=createNativeStackNavigator();

const AppStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
      {/* <Stack.Screen name="Splash" component={Splash}/> */}
      <Stack.Screen name="HomeScreen" component={TabNavigator}/>
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen}/> */}
      <Stack.Screen name="TestsByFilter" component={TestsByFilter}/>
      <Stack.Screen name="Location" component={Location}/>
      <Stack.Screen name="Calltoorder" component={Calltoorder}/>
      <Stack.Screen name='Profile' component={Profile}/>
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown:true }}/>
      <Stack.Screen name='ProductItem' component={ProductItem}/>
      <Stack.Screen name='SubCategories' component={SubCategories}/>
      <Stack.Screen name='Categories' component={Categories}/>
      <Stack.Screen name='CartContainer' component={CartContainer} options={{ headerShown:true }}/>
      <Stack.Screen name='MedicineCart' component={MedicineCart}/>
      <Stack.Screen name='LabCart' component={LabCart}/>
      <Stack.Screen name='OrderHistory' component={OrderHistory}/>
      <Stack.Screen name='ProductDescription' component={ProductDescription}/>
      <Stack.Screen name='Test' component={Test}/>
      <Stack.Screen name='DoctorCard' component={DoctorCard}/>
      <Stack.Screen name='DocBySpecialization' component={DocBySpecialization}/>
      <Stack.Screen name='DoctorDetails' component={DoctorDetails}/>
      <Stack.Screen name='AllTests' component={AllTests}/>
      <Stack.Screen name='AllPackages' component={AllPackages}/>      
      <Stack.Screen name='TestsAndPackagesById' component={TestsAndPackagesById}/>
      <Stack.Screen name='EmptyPage' component={EmptyPage} options={{ headerShown:true }}/>
      <Stack.Screen name='DiagSearch' component={DiagSearch}/>             
      <Stack.Screen name='DocSearch' component={DocSearch}/>    
      <Stack.Screen name='FeaturedBrands' component={FeaturedBrands}/>  
      <Stack.Screen name='FeaturedBrandItems' component={FeaturedBrandItems}/> 
      <Stack.Screen name='WishList' component={WishList}/>                                             
      </Stack.Navigator>
  )
}

export default AppStack;