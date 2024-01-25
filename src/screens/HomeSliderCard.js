import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Dimensions} from 'react-native';

const screenwidth = Dimensions.get('window').width; //full width
const screenheight = Dimensions.get('window').height; //full height

const HomeSliderCard = props => {
  // console.log('image url', props.icon)
  return (
    <View>
      <View style={styles.cardView}>
        <Image style={styles.image} source={props.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: screenwidth - 20,
    height: screenheight / 4,
    backgroundColor: '#454545',
    margin: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: screenwidth - 20,
    height: screenheight / 4,
    borderRadius: 10,
  },
  ballonshape: {
    height: 120,
    width: 120,
    backgroundColor: '#C0C0C0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', //Here is the trick
    alignSelf: 'flex-end',
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 20,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#6495ED',
    bottom: 0,
    height: 30,
    width: 100,
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
});
export default HomeSliderCard;
