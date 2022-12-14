import React, { useEffect, useState } from 'react';
// import Carousel from '../../components/Carousel';
// import Geolocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';
import { dummyData } from '../../../data/data';
import Carousel from '../Carousel';
import { Button, SearchBar } from 'react-native-elements';
import { View, FlatList, StyleSheet, Text, StatusBar, ScrollView , TouchableOpacity,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import ImmuneBoosters from '../ImmuneBoosters';
import Logo from '../LOGO.png'
import { Header, HeaderProps } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Upload from '../Upload';
import Categories from '../Categories';
import ProductDescription from '../ProductDescription';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getRefreshToken } from '../../services/AsyncStorageService';
import Services from '../Services';
import FeaturedBrands from '../FeaturedBrands'
import ProductItem from '../ProductItem';
import Search from '../../components/Search';
import MedicineCart from '../MedicineCart';
import { useDispatch,useSelector } from 'react-redux';
import { calculateTotals } from '../../features/cartSlice';
// import { black } from 'react-native-paper/lib/typescript/styles/colors';
import Specialization from '../Doctors/Specialization'
import Calltoorder from '../Calltoorder';
import Location from '../Location';
import { red } from '@mui/material/colors';
import ProductSearch from './ProductSearch';

const HomeScreen = ({navigation}) => {

  // useEffect(() => {
    // Update the document title using the browser API
    // Geolocation.getCurrentPosition(

    //   (info) => {console.warn('location',info)},
    // (error) => {console.warn('location',error)},
    // { timeout: 20000 }

// Geolocation.getCurrentPosition((success)=>{console.log(success)}, (e)=>{console.log(e)}, {timeout: 20000});


    // );
    // Geolocation.getCurrentPosition(geo_success, [geo_error], [geo_options]);
    // const getGeoLocation = () => {
    //   const config = {
    //     enableHighAccuracy: true,
    //     timeout: 2000,
    //     maximumAge: 3600000,
    //   };
    
    //   Geolocation.getCurrentPosition(
    //     info => console.log("INFO", info),
    //     error => console.log("ERRORR", error),
    //     config,
    //   );
    // };

  // });

  // const {cartItems}=useSelector((store)=>store.cart)
  const dispatch=useDispatch();


  // useEffect(()=>{
  //   const getT=async()=>{
  //       const token=await getRefreshToken() //getting token from storage
  //       // console.log("logrefreshtokenhome",token)
  //       // setUserLToken(token) //store token in local storage
  //    }
  //     getT()
  //   },[]
  //   )
  // useEffect(()=>{
  //   dispatch(calculateTotals());
  // },[cartItems]);
  
  // const navigation=useNavigation();
  const gotocart=()=>{
    navigation.navigate("CartContainer");
  }
//  const cart = useSelector((store)=>store.cart)

    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>  
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
        <Header style={styles.Header} backgroundColor='#fff'
        leftComponent={<Image source={Logo} style={styles.Logo}/>}
        rightComponent={
            <View>
              {/* <Button title={"cart"} onPress={gotocart}></Button> */}
              <TouchableOpacity onPress={gotocart}>
                <Icon name="shopping-cart" color="#2B8AE3" size={40}/>
                {/* {cartCount > 0 ? (
                <View
                    style={{     
                      position: 'absolute',
                      backgroundColor: '#ffffff',
                      width: 20,
                      height: 20,
                      borderRadius: 15 / 2,
                      right: 5,
                      top: -14,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: "red",
                        fontSize: 10,
                      }}>
                      {cartCount}
                    </Text>
                  </View>
                                  ) : null} */}
              </TouchableOpacity>
            </View>
        }
      />
            <Calltoorder/>
            <ScrollView showsVerticalScrollIndicator={false}>  
            <Search placeholder={"Search HelthCare Prodcuts"} editable={false} navigate="EmptyPage" component={<ProductSearch/>}/>
            {/* <Location/> */}
            <Services/>
            {/* <Upload/> */}
            {/* <Carousel data={dummyData}/> */}
            <Specialization/>
            <ImmuneBoosters/>
            <FeaturedBrands/>
            {/* <ShopByCategory/> */}
            <Categories/>
         </ScrollView>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
Header:{
  backgroundColor:'#000'
},

Logo:{
    width:150,
    height:50
}
})
export default HomeScreen;
