import React, { useEffect, useState } from 'react';
// import Carousel from '../../components/Carousel';
import { Platform } from 'react-native';
import { dummyData } from '../../../data/data';
import Carousel from '../Carousel';
import { Button, SearchBar } from 'react-native-elements';
import { View, FlatList, StyleSheet, Text, StatusBar, ScrollView , TouchableOpacity,Image,PermissionsAndroid} from 'react-native';
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
import Geolocation from 'react-native-geolocation-service';
import { display, padding } from '@mui/system';


const HomeScreen = ({navigation}) => {

  const [placeholder, setPlaceholder] = useState('Search For Crocin');

  const placeholders = ['Search For Dolo', 'Search For Diapers'];
  let currentIndex = 0;



  // setInterval(() => {
  //   setPlaceholder(placeholders[currentIndex]);
  //   currentIndex = (currentIndex + 1) % placeholders.length;
  // }, 3000);

  
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
      <SafeAreaView style={{flex:1,backgroundColor:'#fff',flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>  
      {/* <StatusBar/> */}
        {/* <Header style={styles.Header}
        leftComponent={<Image source={Logo} style={styles.Logo}/>}
        rightComponent={
            <View>
              <TouchableOpacity onPress={gotocart}>
                <Icon name="shopping-cart" color="#E73631" size={40}/>
                </TouchableOpacity>
            </View>
        }
      /> */}

      <View style={styles.Header}>
            <View>
            <Image source={Logo} style={styles.Logo}/>  
            </View>
            <View>
                <TouchableOpacity onPress={gotocart}>
                <Icon name="shopping-cart" color="#E73631" size={45}/>
                </TouchableOpacity>
            </View>
      </View>
                {/* <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation}/>
      </View>
      <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text> */}
      
                              {/* <Button title={"cart"} onPress={gotocart}></Button> */}
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
       
           
            <ScrollView showsVerticalScrollIndicator={false}>
            {/* <View style={{display:'flex',flexDirection:'row'}}>   */}
            <Calltoorder text={"Order Medicine"}/>
            <Location/>
            {/* </View> */}
            <Search placeholder={placeholder} editable={false} navigate="EmptyPage" component={<ProductSearch/>}/>
            <Services/>
            {/* <Upload/> */}
            {/* <Carousel data={dummyData}/> */}
            <Specialization/>
            {/* <ImmuneBoosters/> */}
            <FeaturedBrands/>
            <Categories/>
         </ScrollView>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
Header:{
  marginTop:7,
  display:'flex',
  flexDirection:'row',
  // backgroundColor:'#000',
  width:'100%',
  justifyContent:'space-between',
  padding:10
},
Logo:{
    width:150,
    height:50
}
})
export default HomeScreen;
