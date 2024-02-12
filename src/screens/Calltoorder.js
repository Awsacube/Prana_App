import React from 'react';
import {Platform} from 'react-native';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../constants/colors';
import adjust from '../utils/responsive';

const Calltoorder = props => {
  const call = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:${+91 8919797512}';
    } else {
      number = 'tel:${+91 8919797512}';
    }
    Linking.openURL(number);
  };

  return (
    <View style={styles.Calltoorder}>
      <Text style={styles.text}>Call to {props.text}</Text>
      <TouchableOpacity style={styles.button} onPress={call}>
        <Text style={styles.buttonTitle}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Calltoorder;

const styles = StyleSheet.create({
  Calltoorder: {
    width: adjust(310),
    backgroundColor: colors.pearlWhite,
    flexDirection: 'row',
    borderRadius: adjust(5),
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: adjust(5),
    // paddingLeft: adjust(10),
    marginBottom: adjust(5),
  },
  text: {
    color: colors.neutralBlack,
    fontSize: adjust(12),
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.azureBlue,
    borderRadius: adjust(5),
    paddingVertical: adjust(5),
    paddingHorizontal: adjust(15),
    marginVertical: adjust(5),
  },
  buttonTitle: {
    textAlign: 'center',
    color: colors.pearlWhite,
    fontWeight: 'bold',
  },
});
