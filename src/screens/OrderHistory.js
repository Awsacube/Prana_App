import {StyleSheet, Text, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getToken} from '../services/AsyncStorageService';
import React, {useState, useEffect} from 'react';
import {useGetOrderHistoryQuery} from '../services/userAuthApi';
import {Dimensions} from 'react-native';
import {borderColor, display} from '@mui/system';
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
  return (
    <SafeAreaView>
      <FlatList
        data={orders[0]}
        keyExtractor={(item, index) => item.uuid}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={styles.orderLayout}>
              <View style={styles.top}>
                <Text>Order Id: {item.order_id}</Text>
                <Text> {item.status}</Text>
              </View>
              <View style={styles.bottom}>
                <Text>Rs: {item.total_amount}</Text>
                <Text>Placed On:{item.createdAt}</Text>
              </View>
              <Text>Address: {item.shipping_address}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  orderLayout: {
    width: screenwidth / 1.1,
    height: screenheight / 10,
    borderWidth: 0.2,
    borderColor: '000',
    margin: 10,
    borderRadius: 10,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
});
