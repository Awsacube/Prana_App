import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useGetAllCartItemsQuery,
  useGetLoggedUserQuery,
  useHandlePlaceOrderMutation,
} from '../services/userAuthApi';
import {getToken} from '../services/AsyncStorageService';
import {colors} from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Entypo from 'react-native-vector-icons/Entypo';

import adjust from '../utils/responsive';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {Image} from 'react-native';
import {
  deliveryCharges,
  subTotal,
  totalDiscount,
  totalValue,
} from '../utils/mathFunc';
import {ScrollView} from 'react-native';

const Checkout = ({navigation, buttonData}) => {
  const [userLToken, setUserLToken] = useState();
  const [profileData, setProfileData] = useState();
  const [quantity, setquantity] = useState(1);
  const address = useSelector(state => state.order.address);
  const paymentType = useSelector(state => state.order.paymentType);

  let cart = [];

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const {data, isLoading, isFetching, error, isSuccess, refetch} =
    useGetAllCartItemsQuery(userLToken, {refetchOnMountOrArgChange: true});
  // {
  //   isLoading && console.log('Loading');
  // }
  // {
  //   isFetching && console.log('fetching');
  // }
  {
    error && console.log('cart error', error);
  }
  {
    isSuccess && console.log('cart data', data);
  }
  {
    isSuccess &&
      data.forEach(element => {
        const cartItemUuid = element.uuid;
        const quantity = element.quantity;
        const name = element.product.name;
        const image = element.product.image;
        const uuid = element.product.uuid;
        const price = element.product.price;
        const discount = element.product.discount;
        cart.unshift({
          name: name,
          image: image,
          uuid: uuid,
          price: price,
          quantity: quantity,
          cartItemUuid: cartItemUuid,
          discount: discount,
        });
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

  const billingAddress = address;
  const shippingAddress = address;

  const [placeOrder] = useHandlePlaceOrderMutation();

  const handlePlaceOrder = async () => {
    // console.log(cartItemUuid);
    // const placeOrderData = {
    //   product_ids: [products],
    //   shipping_address: shippingAddress,
    //   billing_Address: billingAddress,
    //   payment_method: paymentType,
    // };
    // await placeOrder(placeOrderData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cancelContainer}>
        <Pressable onPress={() => navigation.navigate('CartContainer')}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.billContainer}>
          <Text style={styles.title}>Order now</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.text}>
              Shipping to:{' '}
              <Text style={styles.boldText}>{address.split(':')[1]}</Text>
            </Text>
            <View style={styles.border} />
            <View style={styles.flexContainer}>
              <Text style={styles.text}>Items:</Text>
              <Text style={styles.text}>
                ₹{parseFloat(subTotal(data)).toFixed(2)}
              </Text>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.text}>Delivery:</Text>
              <Text style={styles.text}>
                {/* // {Math.ceil((subTotal - discount - couponValue) * 0.1).toFixed(2)} */}
                ₹{parseFloat(deliveryCharges(data)).toFixed(2)}
              </Text>
            </View>
            <View style={[styles.flexContainer, styles.padding]}>
              <Text style={styles.boldText}>Order Total:</Text>
              <Text style={styles.boldText}>
                ₹
                {parseFloat(
                  subTotal(data) - totalDiscount(data) + deliveryCharges(data),
                ).toFixed(2)}
              </Text>
            </View>
            <View style={styles.border} />
            <Text style={[styles.text, styles.center]}>
              You Are Saving{' '}
              <Text style={[styles.boldText, styles.color]}>
                ₹{parseFloat(totalDiscount(data)).toFixed(2)}
              </Text>{' '}
              On This Order
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.flexContainer}>
              <Text style={styles.text}>{paymentType}</Text>
              <Entypo
                name={'chevron-small-right'}
                size={adjust(24)}
                color={colors.gray_600}
              />
            </View>
          </View>
          <Pressable
            style={styles.cardContainer}
            onPress={() => navigation.navigate('DeliveryAddress')}>
            <View style={[styles.flexContainer]}>
              <View>
                <Text style={styles.text}>Delivery to</Text>
                <Text style={[styles.padding, styles.boldText]}>
                  {address.split(':')[0]}
                </Text>
                <Text style={[styles.padding, styles.boldText]}>
                  {address.split(':')[1]}
                </Text>
                <Text style={[styles.boldText, styles.padding]}>
                  {address.split(':')[2]}
                </Text>
              </View>
              <Entypo
                name={'chevron-small-right'}
                size={adjust(24)}
                color={colors.gray_600}
              />
            </View>
          </Pressable>
          <Text style={styles.title}>Shipping Items</Text>
          <FlatList
            data={cart}
            // keyExtractor={item => item.item.uuid}
            renderItem={item => {
              return (
                <View style={styles.mainContainer}>
                  <View style={styles.image}>
                    <Image
                      style={styles.image}
                      source={{uri: item.item.image}}
                    />
                  </View>
                  <View>
                    <View style={styles.details}>
                      <Text style={styles.productText}>{item.item.name}</Text>
                      <View style={[styles.priceFlex]}>
                        <Text style={styles.mrp}>MRP</Text>
                        <Text style={styles.price}>₹{totalValue(item)}</Text>
                        <Text style={styles.priceOverline}>
                          ₹{parseFloat(item.item.price).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.evenly]}>
                      <View style={[styles.row, styles.gap3]}>
                        <Pressable
                          onPress={decreaseCartQuantity}
                          // disabled={quantity === 1}
                          style={[styles.box, {backgroundColor: '#fff'}]}>
                          <AntDesign
                            name="minus"
                            color={'#1c738c'}
                            size={18}
                            strokeWidth={2.5}
                          />
                        </Pressable>
                        <View>
                          <Text style={styles.bold}>{item.item.quantity}</Text>
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
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <Pressable
        style={styles.placeOrderContainer}
        onPress={handlePlaceOrder()}>
        <Text style={styles.placeOrder}>Place Order</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: adjust(50),
  },
  container: {
    backgroundColor: colors.pearlWhite,
    flex: 1,
    position: 'relative',
  },
  cancelContainer: {
    width: '100%',
    backgroundColor: colors.azureBlue,
    padding: 14,
  },
  cancelText: {
    marginLeft: 'auto',
    color: colors.white,
    fontWeight: '700',
  },
  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10,
  },
  billContainer: {
    paddingHorizontal: adjust(5),
  },
  cardContainer: {
    borderWidth: 0.4,
    borderColor: colors.azureBlue,
    backgroundColor: colors.backgroundBlue,
    // paddingHorizontal: adjust(10),
    paddingVertical: adjust(5),
    borderRadius: adjust(5),
    marginVertical: adjust(3),
  },
  text: {
    fontSize: adjust(12),
    fontWeight: '400',
    color: colors.neutralBlack,
    paddingHorizontal: adjust(10),
    textTransform: 'capitalize',
  },
  border: {
    borderWidth: 0.4,
    borderColor: colors.azureBlue,
    marginVertical: adjust(5),
  },
  boldText: {
    fontSize: adjust(13),
    fontWeight: '500',
    textTransform: 'capitalize',
    color: colors.neutralBlack,
    overflow: 'hidden',
    textAlign: 'justify',
    // width: adjust(270),
    // marginVertical: adjust(3),
  },
  flexContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  padding: {
    paddingHorizontal: adjust(10),
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
    backgroundColor: colors.red,
  },
  details: {
    marginRight: adjust(10),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: adjust(-25),
  },
  productText: {
    fontSize: adjust(14),
    color: colors.black,
    fontWeight: '500',
    textTransform: 'capitalize',
    // marginBottom: adjust(5),
    marginLeft: adjust(3),
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
  evenly: {
    height: '10%',
    // alignItems: 'center',
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
  placeOrderContainer: {
    backgroundColor: colors.azureBlue,
    padding: adjust(10),
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  placeOrder: {
    fontSize: adjust(12),
    fontWeight: '500',
    color: colors.pearlWhite,
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
  },
  color: {
    color: colors.azureBlue,
  },
});
