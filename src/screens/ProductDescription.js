import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getToken} from '../services/AsyncStorageService';
import {
  useAddToWishlistMutation,
  useGetProductQuery,
  useWishListQuery,
} from '../services/userAuthApi';
import {
  useGetAllCartItemsQuery,
  useAddToCartMutation,
} from '../services/userAuthApi';
import {colors} from '../constants/colors';
import adjust from '../utils/responsive';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

export default function ProductDescription({route}) {
  const [quantity, setquantity] = useState(1);

  const {productid} = route.params;

  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const res = useGetProductQuery(productid);

  const [addToCart] = useAddToCartMutation(); //send cart data to backend
  const [addToWishlist] = useAddToWishlistMutation(); //send cart data to backend
  const {refetch: refetchWishlist} = useWishListQuery({token: userLToken});
  const cartData = {
    id: productid,
    quantity: quantity,
    token: userLToken,
  };
  const addToCartHandler = async () => {
    await addToCart(cartData);
    ToastAndroid.show('Product added to cart', ToastAndroid.SHORT);
  };
  const addToWishlistHandler = async () => {
    await addToWishlist(cartData);
    ToastAndroid.show('Product added to Wishlist', ToastAndroid.SHORT);
    refetchWishlist();
  };

  const productDesc = [];

  let name;
  let price;
  let image;
  let uuid;
  let description;
  let discount;

  if (res.isSuccess === true) {
    const data = res.data;
    console.log('data', data);
    name = res.data.name;
    image = res.data.image;
    price = res.data.price;
    discount = res.data.discount;
    uuid = res.data.uuid;
    description = res.data.description;
    productDesc.unshift({
      name: name,
      image: image,
      uuid: uuid,
      price: price,
      discount: discount,
      description: description,
    });
  }

  const increaseCartQuantity = () => {
    setquantity(quantity + 1);
  };
  const decreaseCartQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  };

  const totalValue = item => {
    return price - (price * discount) / 100;
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{uri: image}} />
        <View style={styles.infoContainer}>
          <View style={styles.flexContainer}>
            <Text style={styles.name}>{name}</Text>
            <View style={[styles.evenly]}>
              <View style={[styles.row, styles.gap3]}>
                <Pressable
                  onPress={decreaseCartQuantity}
                  disabled={quantity === 1}
                  style={[styles.box, {backgroundColor: '#fff'}]}>
                  <AntDesign
                    name="minus"
                    color={'#1c738c'}
                    size={18}
                    strokeWidth={2.5}
                  />
                </Pressable>
                <View>
                  <Text style={styles.bold}>{quantity}</Text>
                </View>
                <Pressable
                  onPress={increaseCartQuantity}
                  style={[styles.box, {backgroundColor: '#fff'}]}>
                  <AntDesign
                    name="plus"
                    color={'#1c738c'}
                    size={18}
                    strokeWidth={2.5}
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={[styles.priceFlex]}>
            <Text style={styles.mrp}>MRP</Text>
            <Text style={styles.price}>₹{totalValue()}</Text>
            <Text style={styles.priceOverline}>
              ₹{parseFloat(price).toFixed(2)}
            </Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.wishlistButton}
              onPress={() => addToWishlistHandler()}>
              <Text style={styles.wishlistText}>Add to wishlist</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={addToCartHandler}>
              <Text style={styles.buttonText}>Add to cart</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignContent: 'center',
    backgroundColor: colors.pearlWhite,
  },
  image: {
    height: adjust(250),
    width: '100%',
  },
  infoContainer: {
    // padding: 16,
    paddingVertical: adjust(3),
    paddingHorizontal: adjust(10),
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: adjust(14),
    fontWeight: '500',
    color: colors.neutralBlack,
    textTransform: 'capitalize',
  },
  evenly: {
    height: '10%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    height: adjust(25),
    width: adjust(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pearlWhite,
    borderWidth: 1,
    borderColor: colors.azureBlue,
    borderRadius: adjust(5),
  },
  bold: {
    fontSize: adjust(13),
    fontWeight: 'bold',
    color: colors.azureBlue,
    width: '100%',
    paddingHorizontal: adjust(10),
  },
  priceFlex: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: adjust(5),
    borderRadius: adjust(5),
  },
  mrp: {
    fontSize: adjust(12),
    color: colors.azureBlue,
    fontWeight: '400',
    textAlign: 'center',
    marginRight: adjust(5),
  },
  price: {
    fontSize: adjust(12),
    color: colors.black,
    fontWeight: '500',
    textAlign: 'center',
  },
  priceOverline: {
    fontSize: adjust(10),
    color: colors.gray_600,
    fontWeight: '500',
    textAlign: 'center',
    textDecorationLine: 'line-through',
    marginLeft: adjust(5),
  },
  description: {
    fontSize: adjust(11),
    fontWeight: '400',
    color: colors.neutralBlack,
    marginBottom: adjust(10),
  },
  button: {
    marginVertical: adjust(5),
    paddingVertical: adjust(5),
    borderRadius: adjust(5),
    textAlign: 'center',
    backgroundColor: colors.azureBlue,
    borderWidth: 1,
    borderColor: colors.azureBlue,
  },
  buttonText: {
    color: colors.pearlWhite,
    fontSize: adjust(12),
    fontWeight: '500',
    textAlign: 'center',
  },
  wishlistButton: {
    marginVertical: adjust(5),
    paddingVertical: adjust(5),
    borderRadius: adjust(5),
    textAlign: 'center',
    backgroundColor: colors.pearlWhite,
    borderWidth: 1,
    borderColor: colors.azureBlue,
  },
  wishlistText: {
    color: colors.azureBlue,
    fontSize: adjust(14),
    fontWeight: '500',
    textAlign: 'center',
  },
});
