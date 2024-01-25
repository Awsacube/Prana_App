import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Logo from '../assets/LOGO.png';
import background from '../assets/signback.jpeg';
import Custombutton from '../components/Custombutton';
import Custominput from '../components/Custominput';

const ForgotPass = () => {
  const [userName, setUserName] = useState('');

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const OnSignin = () => {
    console.warn('signin');
    navigation.navigate('Signin');
  };

  const OnSendPressed = () => {
    console.warn('Resend');
    navigation.navigate('NewPass');
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={background} style={styles.image}>
          <View style={styles.root}>
            <Image
              source={Logo}
              style={[styles.logo, {height: height * 0.3}]}
              resizeMode="contain"
            />
            <Text style={styles.title}>Forgot Password</Text>
            <Custominput
              placeholder="Email"
              value={userName}
              setValue={setUserName}
            />
            <Custombutton
              text="Send verification code"
              onPress={OnSendPressed}
            />
            <Custombutton
              text="Back to Signin"
              onPress={OnSignin}
              type="TERTIARY"
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  image: {
    height: 750,
  },
});

export default ForgotPass;
