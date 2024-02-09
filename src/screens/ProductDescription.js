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
  const {refecth} = useGetAllCartItemsQuery();
  const {refecthWishlist} = useWishListQuery();
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
    console.log('added');
    ToastAndroid.show('Product added to Wishlist', ToastAndroid.SHORT);
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

  const increaseCartQuantity = () => {
    setquantity(quantity + 1);
  };
  const decreaseCartQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
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
          <Text style={styles.price}>MRP: ₹{price}</Text>
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
    backgroundColor: '#fff',
  },
  image: {
    height: 300,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
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
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1c738c',
    borderRadius: 5,
  },
  bold: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1c738c',
    width: '100%',
    paddingHorizontal: 10,
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
  button: {
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#1c738c',
    borderWidth: 1,
    borderColor: '#1c738c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  wishlistButton: {
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1c738c',
  },
  wishlistText: {
    color: '#1c738c',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
