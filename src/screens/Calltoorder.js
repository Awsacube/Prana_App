import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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
      <Text style={styles.text}>Call o {props.text}</Text>
      <TouchableOpacity style={styles.button} onPress={call}>
        <Text style={styles.buttonTitle}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Calltoorder;

const styles = StyleSheet.create({
  Calltoorder: {
    marginLeft: 12,
    marginRight: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    borderRadius: 30,
  },
  text: {
    color: '#000',
    paddingTop: 15,
    paddingLeft: 5,
    fontWeight: 'bold',
  },
  button: {
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 7,
    backgroundColor: '#E73631',
    borderRadius: 10,
    width: 50,
  },
  buttonTitle: {
    paddingLeft: 10,
    paddingTop: 5,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
