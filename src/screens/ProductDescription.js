import React,{useState,useEffect} from 'react';
import { View, Text, Image, ScrollView, FlatList, StyleSheet, Animated, ImageBackground } from 'react-native';
import { Select } from '@mui/material';
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../services/AsyncStorageService';
import {useGetProductQuery} from '../services/userAuthApi';
import { useAddToCartMutation } from '../services/userAuthApi';
import QuantityModalPicker from './QuantityModalPicker';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { iteratorSymbol } from 'immer/dist/internal';
// import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import {ConstantId} from './token';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height
const scrollX = new Animated.Value(0);
let position = Animated.divide(scrollX, screenwidth);
import { useDispatch, useSelector } from "react-redux";
import {cartActions} from '../app/cart-slice';
import Counter from "react-native-counters";
import { SelectCountry } from 'react-native-element-dropdown';
import SelectDropdown from 'react-native-select-dropdown'






const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ProductDescription({route}) {

  const[quantity,setquantity]=useState();



  const countries = [1,2,3,4,5,6,7,8,9,10]



  const navigation=useNavigation();

  const { productid }=route.params;

  const[userLToken,setUserLToken]=useState()
  useEffect(()=>{
    (async()=>{
      const token=await getToken() //getting token from storage
      setUserLToken(token) //store token in local storage
    })()
   }
  )

  
  // const token =  ConstantId.accessToken ;
  
  const res=useGetProductQuery(productid)

  console.warn(res);

  const dispatch=useDispatch();
  const [cartQueryItems]=useAddToCartMutation();

  const addToCart=()=>{
    dispatch(cartActions.addToCart({
      name,
      uuid,
      price,
      quantity,
    }))
      cartData={
        id:productid,
        quantity:quantity,
        token:userLToken}
      cartQueryItems(cartData);
  }


  const productDesc=[];

  let name;
  let price;
  let image;
  let uuid;
  let description;

  if(res.isLoading===false){

    const data=res.data;
         name=res.data.name;
         image=res.data.image;
         price=res.data.price;
         uuid=res.data.uuid;
         description=res.data.description;
         productDesc.unshift({"name":name,"image":image,"uuid":uuid,"price":price,"description":description})
  }




  const categorylist = [{
    "image": "https://thumbs.dreamstime.com/b/medical-red-white-…-capsules-medicine-background-drugs-146820806.jpg"
  },
  {
    "image": "https://source.unsplash.com/1024x768/?water"
  },
  {
    "image": "https://source.unsplash.com/1024x768/?girl"
  },
  {
    "image": "https://source.unsplash.com/1024x768/?tree"
  }];

  return (
//     <ScrollView>
//       <View style={styles.container}>
//       {/* <FlatList
//           data={productDesc}
//           keyExtractor={(item, index) => {name}}
//           horizontal
//           pagingEnabled
//           scrollEnabled
//           snapToAlignment="center"
//           scrollEventThrottle={16}
//           decelerationRate={"fast"}
//           showsHorizontalScrollIndicator={false}

//           renderItem={({ item, index }) => {

//             // return ( */}

//               <View style={styles.addressLayout}> 
//               {/* //addressLayoutstart */}

//               <View style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//                 <Icon name="location-pin" size={20} color="#000" />
    
//                 <Text style={{ marginLeft: 10 }}>Deliver to </Text>
    
//                 <Text style={{ color: '#14837D' }}> 500025 Hyderabad</Text>
    
//               </View>
    
//               <Text style={{ color: '#14837D' }}>Change</Text>
    
//             </View>
//                           {/* //addressLayout ends */}

    
//               <View style={styles.cardView}>
//               {/* imagecard */}
//                 <Image style={styles.image} source={{ uri: image }} />
//               </View>

//           {/* <View style={styles.offerDesign}>

//   <View style={styles.offerLayout}>

//     <Icon name="local-offer" size={20} color="#ff7f7e" />

//     <Text style={styles.offer}>OFFERS</Text>
//   </View>

//   <View style={styles.dotView}>

//     {categorylist.map((_, i) => {
//       let opacity = position.interpolate({
//         inputRange: [i - 1, i, i + 1],
//         outputRange: [0.3, 1, 0.3],
//         extrapolate: "clamp",
//       });
//       return (
//         <Animated.View
//           key={i}
//           style={{
//             opacity,
//             height: 8,
//             width: 8,
//             backgroundColor: "#14837D",
//             margin: 6,
//             borderRadius: 5,
//           }}
//         />
//       );
//     })}
//   </View>

//   <View style={{
//     flex: 1,
//     alignItems: 'flex-end'
//   }}>

//     <AntDesign name="shake" size={20} color="#57bbd2" />

//   </View>

//   </View> */}

// <Text style={styles.productname}>{name}</Text>

// <Text>{description}</Text>

// {/* <Text style={{ color: '#14837D', marginLeft: 15 }}>Visit Pillbox Store</Text> */}

// <View style={styles.mrp}>

// <Text style={{ color: '#32a852' }}>MRP : </Text>

// <Text style={{ color: '#32a852' }}>{price}</Text>

// <Text style={styles.offText}>50% OFF</Text>

// </View>


// <View style={styles.mrpLayout}>

// <View>

//   <Text style={{ color: '#000' }}>{price}</Text>

//   <Text style={{ color: '#90989c' }}>Inclusive of all taxes</Text>

//   {/* <Counter start={1} min={1} max={20} onChange={this.onChange.bind(this)}/> */}

//       {/* <Button onPress={incrementQuantity}  title="+"></Button>
//       <Text>Quantity:{quantity}</Text>

//       <Button style={{height:100}} onPress={decrementQuantity} title="-"></Button> */}
//    {/* <DropDownPicker
//       open={open}
//       value={value}
//       items={items}
//       setOpen={setOpen}
//       setValue={setValue}
//       setItems={setItems}
//     /> */}

// <SelectDropdown
// 	data={countries}
// 	onSelect={(selectedItem, index) => {
// 		// console.log(selectedItem, index)
//     setquantity(selectedItem);
// 	}}

//   defaultButtonText="Select Quantity"
// 	buttonTextAfterSelection={(selectedItem, index) => {
// 		// text represented after item is selected
// 		// if data array is an array of objects then return selectedItem.property to render after item is selected
// 		return `Quantity :${selectedItem}`
// 	}}
// 	rowTextForSelection={(item, index) => {
// 		// text represented for each item in dropdown
// 		// if data array is an array of objects then return item.property to represent item in dropdown
// 		return item
// 	}}
// />

//   <Button style={styles.addToCart} title="Add To Cart" onPress={addToCart}></Button>

//   {/* <Picker
//   selectedValue={quantity}
//   onValueChange={(itemValue, itemIndex) =>
//     setquantity(itemValue)
//   }
//   style={{height: 30, width: 180}}
//   >
//   <Picker.Item label="1" value="1" />
//   <Picker.Item label="2" value="2" />
// </Picker> */}






// </View>

//   {/* <QuantityModalPicker changeModalVisibility={changeModalVisibility}/> */}


// {/* setModalVisible(true) // add to above button line onPress */}

// </View>

// {/* <View style={styles.orderLayout}>

// <Text style={styles.memberText}>Get $12.48 additional cashback with plus membership</Text>

// <Text style={styles.orderText}>Enroll now & enjoy FREE delivery on your order</Text>

// </View> */}

// {/* <View style={styles.packText}>

// <Text style={{ marginLeft: 5 }}>Pack size : 60 NO's</Text>

// <Text style={{ marginRight: 5 }}>1 more</Text>

// </View> */}


// </View>
// {/* </TouchableOpacity> */}
//   </ScrollView>
<SafeAreaView>
      <ScrollView>
        <Image
          style={styles.image}
          source={{uri:image}}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>INR :{price}</Text>
          <Text style={styles.description}>{description}</Text>
          <SelectDropdown
	data={countries}
	onSelect={(selectedItem, index) => {
		// console.log(selectedItem, index)
    setquantity(selectedItem);
	}}

  defaultButtonText="Select Quantity"
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return `Quantity :${selectedItem}`
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>

            <Button
            onPress={addToCart}
            title="Add to cart"
            />
        </View>
      </ScrollView>
    </SafeAreaView>
)
}


            // );
          // }

          // onScroll={Animated.event([
          //   { nativeEvent: { contentOffset: { x: scrollX } } },
          // ],)}
        // />

      

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  cardView: {
    flex: 1,
    width: screenwidth - 20,
    height: screenheight / 3.5,
    margin: 10,
  },
  image: {
    width: screenwidth - 20,
    height: screenheight / 3.5,
    marginTop:60
  },
  dotView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    flex: 1
  },
  offerLayout: {
    flexDirection: 'row',
    backgroundColor: '#ffefef',
    alignItems: 'center',
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    borderRadius: 5
  },
  mrp: {
    marginLeft: 15,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    color:'#32a852'
  },
  productname: {
    color: '#000',
    margin: 55,
    fontSize: 17
  },
  offText: {
    color: '#fff',
    backgroundColor: '#ff7f7e',
    padding: 3,
    borderRadius: 3, marginLeft: 10
  },
  addToCart: {
    color: '#fff',
    backgroundColor: '#10857f',
    width:120,
    height:40
  },
  memberText: {
    color: '#8573e1',
    fontSize: 12,
    textAlign: 'center',
    height: 30,
    textAlignVertical: 'center'
  },
  orderText: {
    backgroundColor: '#8573e1',
    fontSize: 12,
    textAlign: 'center',
    height: 30,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }, orderLayout: {
    borderRadius: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    margin: 15,
    borderRadius: 10,
    borderColor: '#8573e1',
  },
  packText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 1,
    borderWidth: 1,
    marginLeft: 15, marginRight: 15,
    borderRadius: 10,
    height: 40,
    alignItems: 'center'
  },
  mrpLayout: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15
  },
  addressLayout: {
    backgroundColor: '#F4F7FC',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop:50
  },
  offerDesign: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15
  },offer:{
    color: '#000',
    fontSize: 12,
    marginLeft: 5
  },
  //modal styles
  centeredView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    width:150,
    // height:0,
    // backgroundColor:'#fff',
    // marginLeft:100
    // margin:50
  },
 quantityText:{
  //  fontWeight:'bold'
 }
,


 card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },


});
