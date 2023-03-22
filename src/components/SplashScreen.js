import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.splash}>
        <Image source={require('./assets/splash.png')} style={styles.splashImage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: window.width,
    height: window.height,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
