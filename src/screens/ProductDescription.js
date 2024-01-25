import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  Animated,
  ImageBackground,
} from 'react-native';
import {Select} from '@mui/material';
import Modal from 'react-native-modal';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '../services/AsyncStorageService';
import {useGetProductQuery} from '../services/userAuthApi';
import {
  useDeleteCartItemsMutation,
  useGetAllCartItemsQuery,
  useAddToCartMutation,
} from '../services/userAuthApi';
import QuantityModalPicker from './QuantityModalPicker';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
// import { iteratorSymbol } from 'immer/dist/internal';
// import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import {ConstantId} from './token';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height
const scrollX = new Animated.Value(0);
let position = Animated.divide(scrollX, screenwidth);
import {useDispatch, useSelector} from 'react-redux';
import {cartActions} from '../app/cart-slice';
import Counter from 'react-native-counters';
import {SelectCountry} from 'react-native-element-dropdown';
import SelectDropdown from 'react-native-select-dropdown';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ProductDescription({route}) {
  const [quantity, setquantity] = useState();

  const countries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const navigation = useNavigation();

  const {productid} = route.params;

  const [userLToken, setUserLToken] = useState();
  // useEffect(()=>{
  //   (async()=>{
  //     const token=await getToken() //getting token from storage
  //     setUserLToken(token) //store token in local storage
  //   })()
  //  }
  // )

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  // const token =  ConstantId.accessToken ;

  const res = useGetProductQuery(productid);

  console.warn(res);

  const dispatch = useDispatch();

  // const [cartQueryItems]=useAddToCartMutation(); //send cart data to backend

  // const addToCart=()=>{
  //   // dispatch(cartActions.addToCart({
  //   //   name,
  //   //   uuid,
  //   //   price,
  //   //   quantity,
  //   // }))
  //     cartData={
  //       id:productid,
  //       quantity:quantity, ///send cart data to bb\ackend
  //       token:userLToken}
  //     cartQueryItems(cartData);

  // }

  const [addToCart] = useAddToCartMutation(); //send cart data to backend
  const {refecth} = useGetAllCartItemsQuery();
  const cartData = {
    id: productid,
    quantity: quantity,
    token: userLToken,
  };
  const addToCartHandler = async () => {
    await addToCart(cartData);
    refecth();
  };

  const productDesc = [];

  let name;
  let price;
  let image;
  let uuid;
  let description;

  if (res.isSuccess === true) {
    const data = res.data;
    console.log('data', data);
    name = res.data.name;
    image = res.data.image;
    price = res.data.price;
    uuid = res.data.uuid;
    description = res.data.description;
    productDesc.unshift({
      name: name,
      image: image,
      uuid: uuid,
      price: price,
      description: description,
    });
  }

  const categorylist = [
    {
      image:
        'https://thumbs.dreamstime.com/b/medical-red-white-…-capsules-medicine-background-drugs-146820806.jpg',
    },
    {
      image: 'https://source.unsplash.com/1024x768/?water',
    },
    {
      image: 'https://source.unsplash.com/1024x768/?girl',
    },
    {
      image: 'https://source.unsplash.com/1024x768/?tree',
    },
  ];

  return (
    
    <SafeAreaView>
      <ScrollView>
        <Image style={styles.image} source={{uri: image}} />
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
              return `Quantity :${selectedItem}`;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />

          <Button onPress={addToCartHandler} title="Add to cart" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    backgroundColor: '#fff',
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
    marginTop: 60,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  offerLayout: {
    flexDirection: 'row',
    backgroundColor: '#ffefef',
    alignItems: 'center',
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    borderRadius: 5,
  },
  mrp: {
    marginLeft: 15,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#32a852',
  },
  productname: {
    color: '#000',
    margin: 55,
    fontSize: 17,
  },
  offText: {
    color: '#fff',
    backgroundColor: '#ff7f7e',
    padding: 3,
    borderRadius: 3,
    marginLeft: 10,
  },
  addToCart: {
    color: '#fff',
    backgroundColor: '#10857f',
    width: 120,
    height: 40,
  },
  memberText: {
    color: '#8573e1',
    fontSize: 12,
    textAlign: 'center',
    height: 30,
    textAlignVertical: 'center',
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
    borderBottomRightRadius: 10,
  },
  orderLayout: {
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
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
  },
  mrpLayout: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15,
  },
  addressLayout: {
    backgroundColor: '#F4F7FC',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 50,
  },
  offerDesign: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
  },
  offer: {
    color: '#000',
    fontSize: 12,
    marginLeft: 5,
  },
  //modal styles
  centeredView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    width: 150,
    // height:0,
    // backgroundColor:'#fff',
    // marginLeft:100
    // margin:50
  },
  quantityText: {
    //  fontWeight:'bold'
  },
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
    width: '100%',
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
