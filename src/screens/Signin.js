import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ImageBackground,
  ColorPropType,
  Alert,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Logo from '.././assets/LOGO.png';
import Custominput from '../components/Custominput';
import Custombutton from '../components/Custombutton';
import Toast from 'react-native-toast-message';
import {useLoginUserMutation} from '../services/userAuthApi';
import background from '../assets/signback.jpeg';
import {
  getToken,
  storeRefreshToken,
  storeToken,
} from '../services/AsyncStorageService';
import {useDispatch, useSelector} from 'react-redux';
import {Appearance} from 'react-native';
import Signup from './Signup';
import ForgotPass from './ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConstantId} from './token';
import Dummy from './Dummy';
import {SvgUri} from 'react-native-svg';
import {login} from '../app/auth-slice';

const Signin = () => {
  const reduxtoken = useSelector(state => state.auth.userToken);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loaded, setLoaded] = useState(false);

  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loginUser, {isLoading, error, data, isSuccess, isError}] =
    useLoginUserMutation();

  const [signedIn, setsignedIn] = useState(false);
  let res;
  const OnSignInPressed = async () => {
    const formData = {email, password};
    res = await loginUser(formData);
    console.log('resss', res);
    if (res.data.message === 'User logged in successfully') {
      dispatch(login());
      console.log('logged in success');
    }
  };
  if (isSuccess) {
    console.log('success');
    storeToken(data.token);
  }

  const onSignupPressed = () => {
    navigation.navigate('Signup');
  };

  const onForgotPressed = () => {
    navigation.navigate('ForgotPass');
  };

  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  // console.log(userLToken, 'ltokenatsignin');

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={background} style={styles.bgImage}>
          <View style={styles.root}>
            {isSuccess && <Text>{data.message}</Text>}
            {error && <Text>{error.error}</Text>}
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
            <Custominput
              placeholder="Email"
              value={email}
              setValue={setEmail}
              autoCapitalize="none"
            />
            <Custominput
              placeholder="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />
            <Button
              onPress={() => OnSignInPressed()}
              title="Sign in"
              color="#841584"
            />
            <Custombutton
              text="Forgot Password"
              type="TERTIARY"
              onPress={onForgotPressed}
            />
            <Custombutton
              text="Don't have an account ? Create one"
              type="TERTIARY"
              onPress={onSignupPressed}
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
    color: 'black',
    background: '',
  },
  logo: {
    maxWidth: 300,
    maxHeight: 200,
  },
  bgImage: {
    height: 750,
  },
  textDesign: {
    fontSize: 15,
    marginLeft: 15,
    textAlignVertical: 'center',
  },
});

export default Signin;
