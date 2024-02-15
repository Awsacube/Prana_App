import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useGetOrderByIdQuery} from '../services/userAuthApi';
import {getToken} from '../services/AsyncStorageService';
import adjust from '../utils/responsive';
import {colors} from '../constants/colors';
import {windowWidth} from '../utils/dimensions';

const OrderById = () => {
  const orderId = useSelector(state => state.order.orderId);

  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const queryItems = {token: userLToken, id: orderId};

  const res = useGetOrderByIdQuery(queryItems);

  const productDesc = [];

  let name;
  let order_id;
  let createdAt;
  let amount;
  let payment_method;
  let shipping_charge;
  let price;
  let image;
  let uuid;
  let description;
  let discount;

  if (res.isSuccess === true) {
    const data = res.data;
    console.log('data', data);
    name = res.data.amount;
    order_id = res.data.order_id;
    createdAt = res.data.createdAt;
    amount = res.data.amount;
    payment_method = res.data.payment_method;
    shipping_charge = res.data.shipping_charge;
    image = res.data.image;
    price = res.data.price;
    discount = res.data.discount;
    uuid = res.data.uuid;
    description = res.data.description;
    productDesc.unshift({
      name: name,
      order_id: order_id,
      createdAt: createdAt,
      amount: amount,
      payment_method: payment_method,
      shipping_charge: shipping_charge,
      image: image,
      uuid: uuid,
      price: price,
      discount: discount,
      description: description,
    });
  }

  const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const calculateDiscountedAmount = (amount, discount) => {
    if (discount) {
      const discountedAmount = (discount / 100) * amount;
      return {
        discountedAmount: discountedAmount.toFixed(2),
        amountAfterDiscount: (amount - discountedAmount).toFixed(2),
      };
    } else {
      return {
        discountedAmount: '0.00',
        amountAfterDiscount: amount,
      };
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <>
        <View style={styles.cardContainer}>
          {/* <Text style={styles.header}>Order Summary</Text> */}
          <View style={styles.border} />
          <View style={styles.justifyContent}>
            <View style={styles.gap}>
              <Text style={styles.orderTitle}>Order ID</Text>
              <Text style={styles.orderDescription}>#{order_id}</Text>
            </View>
            <View style={[styles.gap, styles.flexEnd]}>
              <Text style={styles.orderTitle}>Delivery Slot</Text>
              <Text style={styles.orderDescription}>12:00 - 14:00</Text>
            </View>
          </View>
          <View style={styles.justifyContent}>
            <View style={styles.gap}>
              <Text style={styles.orderTitle}>Order Date</Text>
              <Text style={styles.orderDescription}>{formattedDate}</Text>
            </View>
            <View style={[styles.gap, styles.flexEnd]}>
              <Text style={styles.totalTitle}>Total Value</Text>
              <Text style={styles.totalTitlePrice}>
                ₹{amount}
                {/* <Text style={styles.totalTitleSmallPrice}>80</Text> */}
              </Text>
            </View>
          </View>
          <View style={styles.justifyContent}>
            <View style={styles.gap}>
              <Text style={styles.orderDescription}>Payment Mode</Text>
            </View>
            <View style={[styles.gap, styles.flexEnd]}>
              <Text
                style={
                  payment_method === ''
                    ? ''
                    : [styles.orderDescription, styles.paymentType]
                }>
                {payment_method}
              </Text>
            </View>
          </View>
          <Text style={[styles.header, styles.mt]}>Your Order</Text>
          <View style={styles.border} />
          <View style={styles.orderContainer}>
            {res.data?.items &&
              res.data.items.map(item => (
                <>
                  <View key={item.id} style={styles.justifyContent}>
                    <View style={styles.flexContainer}>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <Text style={styles.orderItemText}>X</Text>
                      <Text style={styles.orderItemText}>
                        {item.product.name}
                      </Text>
                    </View>
                    <Text style={styles.orderItemPrice}>₹{item.amount}</Text>
                  </View>
                </>
              ))}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.billContainer}>
            <View style={styles.justifyContent}>
              <Text style={styles.billText}>Total Order Value</Text>
              <Text style={styles.billPrice}>
                ₹{amount}
                {/* <Text style={styles.billSmallText}>42</Text> */}
              </Text>
            </View>
            <View style={styles.justifyContent}>
              <Text style={styles.billText}>Shipping</Text>
              <Text style={styles.billPrice}>₹{shipping_charge}</Text>
            </View>
            <View style={styles.justifyContent}>
              <Text style={styles.billText}>
                Discount(
                {discount ? `${discount}%` : '0%'})
              </Text>
              <Text style={styles.billPrice}>
                {/* ₹{order.discount ? calculateDiscountedAmount() : '0.00'} */}
                ₹{calculateDiscountedAmount(amount, discount).discountedAmount}
              </Text>
            </View>
            <View style={styles.border} />
            <View style={styles.justifyContent}>
              <Text style={styles.boldText}>Sub Total</Text>
              <Text style={styles.orderItemPrice}>
                ₹
                {
                  calculateDiscountedAmount(amount, discount)
                    .amountAfterDiscount
                }
                {/* <Text style={styles.billSmallText}>80</Text> */}
              </Text>
            </View>
            <View style={styles.border} />
          </View>

          <View>
            <View style={styles.border} />
            <View style={styles.justifyContent}>
              <Text style={styles.bottomText}>Issues with Order ?</Text>
              <Pressable style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Raise an issue</Text>
              </Pressable>
            </View>
            <Text style={styles.noteText}>
              NOTE:Invoice value may differ from what is shown above (in App)
              due to differ batches and schemes.*
            </Text>
          </View>
        </View>
      </>
    </ScrollView>
  );
};

export default OrderById;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.pearlWhite,
  },
  container: {
    // marginHorizontal: adjust(10),
    // marginVertical: adjust(10),
  },
  cardContainer: {
    position: 'relative',
    paddingHorizontal: adjust(10),
    paddingVertical: adjust(5),
    gap: adjust(10),
  },
  justifyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: adjust(2),
  },
  border: {
    borderTopWidth: 0.5,
    borderColor: colors.gray_400,
    marginVertical: adjust(2),
  },
  header: {
    fontSize: adjust(16),
    fontWeight: '500',
    color: colors.neutralBlack,
    marginVertical: adjust(2),
  },
  orderTitle: {
    fontSize: adjust(10),
    fontWeight: '400',
    color: colors.gray_600,
    marginVertical: adjust(2),
  },
  orderDescription: {
    fontSize: adjust(11),
    fontWeight: '500',
    color: colors.neutralBlack,
  },
  orderContainer: {
    paddingVertical: adjust(5),
    paddingHorizontal: adjust(5),
    borderRadius: adjust(5),
    backgroundColor: colors.backgroundBlue,
    gap: adjust(10),
    marginVertical: adjust(5),
  },
  orderItemText: {
    fontSize: adjust(12),
    fontWeight: '400',
    color: colors.neutralBlack,
    marginHorizontal: adjust(2),
    marginLeft: adjust(10),
  },
  orderItemPrice: {
    fontSize: adjust(13),
    fontWeight: '500',
    color: colors.neutralBlack,
  },
  smallText: {
    fontSize: adjust(9),
    color: colors.neutralBlack,
    fontWeight: '500',
  },
  billPrice: {
    fontSize: adjust(11),
    fontWeight: '500',
    color: colors.neutralBlack,
  },
  billSmallText: {
    fontSize: adjust(8),
    color: colors.neutralBlack,
    fontWeight: '500',
  },
  totalTitle: {
    fontSize: adjust(10),
    fontWeight: '500',
    color: colors.azureBlue,
    marginTop: adjust(5),
  },
  totalTitlePrice: {
    fontSize: adjust(13),
    color: colors.azureBlue,
    fontWeight: '500',
  },
  totalTitleSmallPrice: {
    fontSize: adjust(9),
    color: colors.azureBlue,
    fontWeight: '500',
  },
  flexContainer: {
    flexDirection: 'row',
    gap: adjust(5),
    alignItems: 'center',
  },
  quantity: {
    borderWidth: 1,
    borderColor: colors.azureBlue,
    borderRadius: adjust(2),
    backgroundColor: colors.backgroundBlue,
    width: adjust(15),
    height: adjust(15),
    textAlign: 'center',
    color: colors.neutralBlack,
  },
  paymentType: {
    borderWidth: 1,
    borderColor: colors.azureBlue,
    borderRadius: adjust(2),
    backgroundColor: colors.backgroundBlue,
    paddingHorizontal: adjust(5),
    paddingVertical: adjust(1),
    textAlign: 'center',
    color: colors.azureBlue,
    marginTop: adjust(5),
  },
  gap: {
    gap: adjust(1),
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  mt: {
    marginTop: adjust(10),
  },
  //   bottomContainer:{

  //       position: 'absolute',
  //       bottom: 10,
  //   },
  billContainer: {
    // flex: 1,
    width: '100%',
    gap: adjust(5),
    backgroundColor: colors.pearlWhite,
  },
  billText: {
    fontSize: adjust(11),
    fontWeight: '400',
    color: colors.gray_600,
    marginVertical: adjust(2),
  },
  boldText: {
    marginVertical: adjust(2),
    fontSize: adjust(13),
    fontWeight: '500',
    color: colors.neutralBlack,
  },
  bottomContainer: {
    position: 'absolute',
    width: windowWidth,
    bottom: 0,
    padding: adjust(10),
    gap: adjust(10),
  },
  buttonContainer: {
    borderWidth: 0.8,
    borderColor: colors.azureBlue,
    paddingHorizontal: adjust(8),
    paddingVertical: adjust(5),
    borderRadius: adjust(5),
    marginVertical: adjust(5),
  },
  buttonText: {
    fontSize: adjust(9),
    fontWeight: '400',
    color: colors.azureBlue,
  },
  noteText: {
    fontSize: adjust(9),
    fontWeight: '400',
    color: colors.gray_600,
    textAlign: 'justify',
  },
  bottomText: {
    fontSize: adjust(12),
    fontWeight: '400',
    color: colors.red,
  },
  // modalContainer: {
  //   // flex: 1,
  //   width: adjust(300),
  //   height: adjust(100),
  //   position: 'absolute',
  //   marginTop: adjust(400),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   backgroundColor: colors.red,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  handle: {
    width: '95%',
    // height: adjust(120),
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: adjust(10),
    paddingVertical: adjust(10),
    backgroundColor: colors.backgroundGreen,
    borderRadius: adjust(5),
  },
  modalText: {
    fontSize: adjust(16),
    fontWeight: '500',
    textAlign: 'center',
    color: colors.azureBlue,
    textTransform: 'capitalize',
    paddingHorizontal: adjust(10),
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: adjust(20),
    paddingVertical: adjust(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: colors.azureBlue,
    width: adjust(120),
    padding: adjust(10),
    // margin: 10,
    gap: adjust(10),
    borderRadius: adjust(5),
  },
  modalButtonText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: adjust(14),
    fontWeight: '500',
  },
});
