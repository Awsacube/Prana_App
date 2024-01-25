import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const Dummy = () => {
  return (
    <View style={styles.coming}>
      <Image source={comingsoon} style={styles.img} />
    </View>
  );
};

export default Dummy;

const styles = StyleSheet.create({
  coming: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  img: {
    marginTop: 300,
    marginBottom: 300,
  },
});
