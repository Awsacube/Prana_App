import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
// import { StatusBar } from 'expo-status-bar';

import {TouchableRipple} from 'react-native-paper';

import {widthToDp, heightToDp} from '../../config/theme';

const {width, height} = Dimensions.get('window');

const GetStarted = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ImageBackground
        source={require('../assets/get.png')}
        style={{width: width, height: height, resizeMode: 'contain'}}
      />
      <View
        style={{
          position: 'absolute',
          bottom: heightToDp('20%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
        <View>
          <Text style={styles.title}>Let's Get Started</Text>
          <Text style={styles.subTitle}>Let's consult with doctors now</Text>
        </View>
        <TouchableRipple
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
          rippleColor="#dfe4ea"
        >
          <Text
            style={{
              fontSize: widthToDp(3),
              fontFamily: 'keep-calm',
              color: 'white',
            }}
          >
            Get Started
          </Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: widthToDp('4%'),
    fontFamily: 'keep-calm',
    color: '#3d3d3d',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: widthToDp('3%'),
    fontFamily: 'keep-calm',
    color: '#4b4b4b',
    textAlign: 'center',
  },
  button: {
    width: widthToDp(50),
    height: heightToDp(11),
    backgroundColor: '#3d3d3d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: heightToDp('6%'),
  },
  logo: {
    width: widthToDp('35%'),
    height: heightToDp('25%'),
    resizeMode: 'contain',
    marginBottom: heightToDp(4),
  },
});

export default GetStarted;
