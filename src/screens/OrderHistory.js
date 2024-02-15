import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getToken} from '../services/AsyncStorageService';
import React, {useState, useEffect} from 'react';
import {useGetOrderHistoryQuery} from '../services/userAuthApi';
import {Dimensions} from 'react-native';
import {borderColor, display} from '@mui/system';
import {colors} from '../constants/colors';
import adjust from '../utils/responsive';
import {useNavigation} from '@react-navigation/native';
import {setOrderId} from '../app/orderSlice';
import {useDispatch} from 'react-redux';

// import { FlatList } from 'react-native-gesture-handler';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const OrderHistory = () => {
  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const {data, isSuccess, error} = useGetOrderHistoryQuery(userLToken);

  let orders = [];

  if (isSuccess) {
    orders.push(data.data);
  }
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOrderData = id => {
    dispatch(setOrderId({orderId: id}));
    console.log(id);
    navigation.navigate('OrderById');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders[0]}
        keyExtractor={(item, index) => item.uuid}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const formattedDate = new Date(item.createdAt).toLocaleDateString(
            'en-GB',
            {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            },
          );
          return (
            <Pressable
              style={styles.orderLayout}
              onPress={() => handleOrderData(item.uuid)}>
              <View style={styles.top}>
                <Text style={styles.header}>
                  Order Id: <Text style={styles.subText}>{item.order_id}</Text>
                </Text>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
              <View style={styles.bottom}>
                <Text style={styles.header}>
                  Placed On:<Text style={styles.subText}>{formattedDate}</Text>
                </Text>
                <Text style={styles.header}>
                  Address:
                  <Text style={styles.subText}> {item.shipping_address}</Text>
                </Text>
                <Text style={styles.header}>
                  Rs:
                  <Text style={styles.subText}> {item.total_amount}</Text>
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pearlWhite,
    flex: 1,
    // paddingHorizontal: adjust(5),
  },
  orderLayout: {
    backgroundColor: colors.backgroundBlue,
    width: 'auto',
    height: 'auto',
    borderWidth: 0.2,
    borderColor: colors.azureBlue,
    margin: adjust(5),
    paddingHorizontal: adjust(5),
    paddingVertical: adjust(10),
    borderRadius: adjust(5),
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: adjust(),
  },
  bottom: {
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    marginVertical: adjust(2),
    fontSize: adjust(12),
    fontWeight: '500',
    color: colors.neutralBlack,
  },
  subText: {
    fontSize: adjust(11),
    fontWeight: '400',
    color: colors.neutralBlack,
  },
  statusText: {
    fontSize: adjust(10),
    fontWeight: '500',
    color: colors.darkGreen,
    borderWidth: 1,
    borderColor: colors.darkGreen,
    backgroundColor: colors.lightGreen,
    paddingHorizontal: adjust(5),
    paddingVertical: adjust(3),
    borderRadius: adjust(5),
    textAlign: 'center',
  },
});
