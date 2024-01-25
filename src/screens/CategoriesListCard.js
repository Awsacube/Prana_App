import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
const screenwidth = Dimensions.get('window').width; //full width
const screenheight = Dimensions.get('window').height; //full height

const CategoriesListCard = props => {
  return (
    <TouchableRipple onPress={props.onPress}>
      <View style={styles.container}>
        <Image source={props.icon} style={styles.image} />
        <Text style={styles.productname}>
          {props.productname != null ? props.productname : ''}
        </Text>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenwidth / 4,
    height: screenheight / 7,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  image: {
    width: screenwidth / 5,
    height: screenheight / 10,
    alignSelf: 'center',
    borderRadius: 50,
  },
  productname: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
});

export default CategoriesListCard;
