import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {brandColor} from '../constants/constants';

import React from 'react';

const CButton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={{color: 'white'}}>{props.Text}</Text>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: brandColor,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
  },
});
