import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Calltoorder from '../screens/Calltoorder';
import CartContainer from '../screens/CartContainer';
import Categories from '../screens/Categories';
import AllPackages from '../screens/Diagnostics/AllPackages';
import AllTests from '../screens/Diagnostics/AllTests';
import DiagSearch from '../screens/Diagnostics/DiagSearch';
import Test from '../screens/Diagnostics/Test';
import TestsAndPackagesById from '../screens/Diagnostics/TestsAndPackagesById';
import TestsByFilter from '../screens/Diagnostics/TestsByFilter';
import BookAppointment from '../screens/Doctors/BookAppointment';
import DocBySpecialization from '../screens/Doctors/DocBySpecialization';
import DocSearch from '../screens/Doctors/DocSearch';
import DoctorCard from '../screens/Doctors/DoctorCard';
import DoctorDetails from '../screens/Doctors/DoctorDetails';
import EmptyPage from '../screens/EmptyPage';
import FeaturedBrandItems from '../screens/FeaturedBrandItems';
import FeaturedBrands from '../screens/FeaturedBrands';
import LabCart from '../screens/LabCart';
import Location from '../screens/Location';
import MedicineCart from '../screens/MedicineCart';
import OrderHistory from '../screens/OrderHistory';
import ProductDescription from '../screens/ProductDescription';
import ProductItem from '../screens/ProductItem';
import Address from '../screens/Profile/Address';
import EditProfile from '../screens/Profile/EditProfile';
import Profile from '../screens/Profile/Profile';
import SubCategories from '../screens/SubCategories';
import WishList from '../screens/wishlist';
import StoresNearMe from '../screens/StoresNearMe';
import TabNavigator from './TabNavigator';
import DeliveryAddress from '../screens/DeliveryAddress';
import Checkout from '../screens/Checkout';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={TabNavigator} />
      <Stack.Screen name="TestsByFilter" component={TestsByFilter} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="Calltoorder" component={Calltoorder} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: true}}
      />
      <Stack.Screen name="ProductItem" component={ProductItem} />
      <Stack.Screen name="SubCategories" component={SubCategories} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen
        name="CartContainer"
        component={CartContainer}
        options={{headerShown: true}}
      />
      <Stack.Screen name="MedicineCart" component={MedicineCart} />
      <Stack.Screen name="LabCart" component={LabCart} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="ProductDescription" component={ProductDescription} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="DoctorCard" component={DoctorCard} />
      <Stack.Screen
        name="DocBySpecialization"
        component={DocBySpecialization}
      />
      <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
      <Stack.Screen name="AllTests" component={AllTests} />
      <Stack.Screen name="AllPackages" component={AllPackages} />
      <Stack.Screen
        name="TestsAndPackagesById"
        component={TestsAndPackagesById}
      />
      <Stack.Screen
        name="EmptyPage"
        component={EmptyPage}
        options={{headerShown: true}}
      />
      <Stack.Screen name="DiagSearch" component={DiagSearch} />
      <Stack.Screen name="DocSearch" component={DocSearch} />
      <Stack.Screen name="FeaturedBrands" component={FeaturedBrands} />
      <Stack.Screen name="FeaturedBrandItems" component={FeaturedBrandItems} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="StoresNearMe" component={StoresNearMe} />
      <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
};

export default AppStack;
