import React, { useEffect, useState } from 'react';
// import Carousel from '../../components/Carousel';
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
import { getToken } from '../../services/AsyncStorageService';
import Services from '../Services';
import FeaturedBrands from '../FeaturedBrands'
import ProductItem from '../ProductItem';
import Search from '../../components/Search';
import CartContainer from '../CartContainer';
import { useDispatch,useSelector } from 'react-redux';
import { calculateTotals } from '../../features/cartSlice';
// import { black } from 'react-native-paper/lib/typescript/styles/colors';
import Doctors from '../Doctors/Doctors'
import Calltoorder from '../Calltoorder';

const HomeScreen = ({navigation}) => {

  // const {cartItems}=useSelector((store)=>store.cart)
  const dispatch=useDispatch();

  // useEffect(()=>{
  //   dispatch(calculateTotals());
  // },[cartItems]);
  
  // const navigation=useNavigation();
  const gotocart=()=>{
    navigation.navigate("CartContainer");
  }
//  const cart = useSelector((store)=>store.cart)
//  console.warn(cart)

    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>       
       <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>  
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
            <Search placeholder='Search for Medicines'/>
            <Services/> 
            {/* <Upload/> */}
            <Carousel data={dummyData}/>
            <Doctors/>
            <ImmuneBoosters/>
            <FeaturedBrands/>
            {/* <ShopByCategory/> */}
            <Categories/>
         </ScrollView>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({


Logo:{
    width:150,
    height:50
}
})
export default HomeScreen;
