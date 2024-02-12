import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import adjust from '../utils/responsive';
import {colors} from '../constants/colors';
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
    width: screenwidth / 4.1,
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
    borderRadius: adjust(50),
  },
  productname: {
    fontSize: adjust(11),
    color: colors.neutralBlack,
    textAlign: 'center',
    marginTop: adjust(3),
    marginBottom: adjust(10),
  },
});

export default CategoriesListCard;
