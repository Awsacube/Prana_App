import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  useAddToCartMutation,
  useGetproductsbyfilteridQuery,
} from '../services/userAuthApi';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getToken} from '../services/AsyncStorageService';
import {colors} from '../constants/colors';
import adjust from '../utils/responsive';
import EmptyCart from '../assets/cart_empty.png';

export default function ProductItem({route}) {
  const navigation = useNavigation();

  const productList = [];

  const {id} = route.params;

  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const queryItems = {token: userLToken, id: id};

  const res = useGetproductsbyfilteridQuery(queryItems, {
    refetchOnMountOrArgChange: true,
  });

  console.warn(res);

  if (res.isSuccess === true) {
    const data = res.data.products;
    console.log(data, 'productItem');
    data.forEach(element => {
      const name = element.name;
      const image = element.image;
      const price = element.price;
      const uuid = element.uuid;
      const discount = element.discount;
      const description = element.description;
      productList.unshift({
        name: name,
        image: image,
        uuid: uuid,
        price: price,
        description: description,
        discount: discount,
      });
    });
  }

  const [addToCart] = useAddToCartMutation(); //send cart data to backend

  const addToCartHandler = async cartData => {
    console.log(cartData);
    await addToCart(cartData);
    ToastAndroid.show('Product added to cart', ToastAndroid.SHORT);
  };

  const totalValue = item => {
    return item.price - (item.price * item.discount) / 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      {productList.length > 0 ? (
        <FlatList
          data={productList}
          numColumns={1}
          keyExtractor={(item, index) => item.tc_id}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductDescription', {
                    productid: item.uuid,
                  })
                }
                style={styles.mainContainer}>
                <View>
                  <Image style={styles.image} source={{uri: item.image}} />
                </View>
                <View style={styles.details}>
                  <Text style={styles.title}>{item.name}</Text>

                  <View style={[styles.priceFlex]}>
                    <Text style={styles.mrp}>MRP</Text>
                    <Text style={styles.price}>₹{totalValue(item)}</Text>
                    <Text style={styles.priceOverline}>
                      ₹{parseFloat(item.price).toFixed(2)}
                    </Text>
                  </View>

                  <Pressable
                    style={styles.cartBtn}
                    // onPress={() => {
                    //   dispatch(handleCart(product.id, 1));
                    // }}>
                    onPress={() =>
                      addToCartHandler({
                        id: item.uuid,
                        quantity: 1,
                        token: userLToken,
                      })
                    }>
                    <Text style={styles.cartBtnText}>Add to cart</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          }}
        />
      ) : (
        <View style={styles.emptyImageContainer}>
          <Image source={EmptyCart} style={styles.emptyImage} />
          <Text style={styles.heading}>No Products Found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlWhite,
    padding: adjust(10),
  },
  mainContainer: {
    flexDirection: 'row',
    height: adjust(130),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray_400,
    padding: adjust(5),
    borderRadius: 10,
    backgroundColor: colors.pearlWhite,
    marginVertical: adjust(3),
  },
  image: {
    width: adjust(110),
    height: adjust(110),
    borderRadius: adjust(5),
    objectFit: 'scale-down',
    marginHorizontal: adjust(5),
    marginRight: adjust(15),
  },
  details: {
    marginRight: adjust(10),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '50%',
    marginTop: adjust(-25),
  },
  title: {
    fontSize: adjust(14),
    color: colors.black,
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: adjust(5),
  },
  priceFlex: {
    flexDirection: 'row',
    padding: adjust(5),
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
  cartBtn: {
    width: '100%',
    backgroundColor: colors.azureBlue,
    paddingVertical: adjust(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: adjust(5),
    position: 'absolute',
    bottom: adjust(-25),
  },
  cartBtnText: {
    color: colors.pearlWhite,
    fontWeight: '500',
    fontSize: adjust(12),
  },
  emptyImageContainer: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  emptyImage: {
    width: adjust(300),
    height: adjust(300),
    objectFit: 'contain',
  },
  heading: {
    fontSize: adjust(14),
    fontWeight: '500',
    color: colors.neutralBlack,
  },
});
