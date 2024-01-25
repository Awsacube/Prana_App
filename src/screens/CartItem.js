import {Button, Image, StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {useDispatch} from 'react-redux';

const CartItem = ({image, name, price, uuid}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View>
        <Image source={{uri: image}} style={styles.img} />
      </View>
      <View>
        <Text>{name}</Text>
        <Text>MRP : {price}</Text>
        <Text>{quantity}</Text>
        <Button title="Remove Item"></Button>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  img: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
