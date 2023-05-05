import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, FlatList, StyleSheet, Animated } from 'react-native';
import CategoriesListCard from './CategoriesListCard';
import HomeSliderCard from './HomeSliderCard';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import HomeSliderCard from "../firstapp/screens/SliderCard";
import { Dimensions } from "react-native";
import offer from './offer.jpeg';
// import SearchBar from "react-native-dynamic-search-bar";
// import { black } from 'react-native-paper/lib/typescript/styles/colors';
import {FlatListSlider} from 'react-native-flatlist-slider';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height
const { width, height } = Dimensions.get('window');
import medicineImagepng from '../assets/pillboxservices/medicenes.png'
import doctor from '../assets/pillboxservices/doctor.jpeg'
import diagn from '../assets/pillboxservices/diagnostics.png'
import covid from '../assets/pillboxservices/Covidproducts.png'
import MedicineImagesvg from '../assets/pillboxservices/medicenes.svg'
import hrecords from'../assets/pillboxservices/Healtrecords.png'
import hproducts from'../assets/pillboxservices/healthproducts.png'
import { Icon } from 'react-native-elements';
const scrollX = new Animated.Value(0);
import { TextInput } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { SvgUri } from 'react-native-svg';
import { color } from '@rneui/base';
let flatList;


let position = Animated.divide(scrollX, width)

export default function App() {

  const navigation=useNavigation();

  const categorylist = [
    {
      "name": "Medicines",
      "image": medicineImagepng,
      "navigateTo":"Categories"
    },
    {
      "name": "Doctor",
      "image": doctor,
      "navigateTo":"Appointments"
    },
    {
      "name": "Diagnostic",
      "image": diagn,
      "navigateTo":"Lab Tests"
    }, 
    {
      "name": "Health Products",
      "image": hproducts,
      "navigateTo":"Categories"
    },
    // {
    //   "name": "Covid support",
    //   "image": covid,
    //   "navigateTo":"Dummy"
    // },
    // {
    //   "name": "Health Records",
    //   "image": hrecords,
    //   "navigateTo":"Dummy"
    // },
  ];

  // const slideImages = [
  //   {
  //   //  image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
  //   image:offer
  //   },
  //  {
  //    image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
  //   },
  //  ]
 

  // useEffect(() => {
  //   infiniteScroll(slideImages);
  // });
  // let scrolled;
  // function infiniteScroll(slideImages) {
  //   const numberOfData = slideImages.length;
  //   let scrollValue = 0
  //     scrolled = 0;

  //   setInterval(function () {
  //     scrolled++;
  //     if (scrolled < numberOfData) scrollValue = scrollValue + width;
  //     else {
  //       scrollValue = 0;
  //       scrolled = 0;
  //     }
  //   }, 1000);
  // }
  return (
      <View style={styles.container}>
        {/* <MedicineImagesvg width={120} height={40} /> */}
        {/* <TextInput
          placeholder="Search medicines and health products"
          style={styles.TextInputStyleClass} 
          left={<TextInput.Icon name={() => <Icon name={'search'} size={40} />}/>}
          underlineColor="transparent" 
        />         */}
{/* <SearchBar
  placeholder="Search Medicine"
  onPress={() => alert("onPress")}
  onChangeText={(text) => console.log(text)}
  style={styles.search}
/> */}
        <Text style={{
          marginLeft: 15, marginTop: 15,marginBottom:15,
          fontSize: 20 ,fontWeight:'bold', color:'#000'
        }}>Health Care</Text>
        <View style={{
          marginTop: 4,
        }}>
          <FlatList
            data={categorylist}
            keyExtractor={(item, index) => item.tc_id}
            vertical
            numColumns={4}
            renderItem={({ item, index }) => {

              const goto=()=>{
                navigation.navigate(item.navigateTo)
              }

              return (
                <CategoriesListCard
                  icon={item.image}
                  productname={item.name}
                  onPress={goto}
                />
              );
            }}
          />
        </View>

        {/* <Text style={{
          marginLeft: 15, marginTop: 10,
          fontSize: 20 ,color:'#000'
        }}>Current Offers</Text> */}


        {/* <FlatList
          data={slideImages}
          keyExtractor={(item, index) => item.name}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}

          renderItem={({ item, index }) => {
            return (
              <HomeSliderCard
               icon={item.image}
              />
            );
          }}

          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        /> */}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor:'#fff',
    marginBottom:20
  },
  // search:{
  //     borderColor:'#000',
  //     borderWidth:1,
  //     marginBottom:10
  // },  
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
},
searchIcon: {
    padding: 10,
    borderWidth: 1,
},
  TextInputStyleClass: {
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: "#FFF",
    marginRight: 5,
    marginLeft:5,
    marginTop: 10,
    flex: 1,
  
  },
  RectangleShapeView: {
    width: screenwidth / 1.1,
    height: screenheight / 3.8,
    backgroundColor: '#6495ED',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10
  },
  circleViolet: {
    width: 239,
    height: 134,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 100,
    backgroundColor: '#596AB2',
    transform: [
      { scaleX: 1.2 }
    ]
  },
  ballonshape: {
    height: 120,
    width: 120,
    backgroundColor: "#CCCCFF",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute", //Here is the trick
    bottom: 0,
    alignSelf: "flex-end",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 60,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  uploadText: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
    textAlign: 'center'
  },
  orderText: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18, color: '#fff',
    fontWeight: "bold"
  },
  prescText: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 14, color: '#fff'
  }

});
