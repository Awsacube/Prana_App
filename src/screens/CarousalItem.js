import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const {width, height} = Dimensions.get('window');

const CarouselItem = ({item}) => {
  console.log('Width', width - 20);

  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={item.url} onPress={item.onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    width: width - 20,
    height: height / 4,
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  image: {
    // width: width-40,
    // height: height / 10,
    borderRadius: 10,
    resizeMode: 'stretch',
    width: undefined,
    height: undefined,
    flex: 1,
    // padding:5
  },
});

export default CarouselItem;
