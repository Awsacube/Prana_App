import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ColorPropType,
  Alert,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Logo from '../assets/LOGO.png';
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

import {Formik} from 'formik';
import * as Yup from 'yup';
import {Pressable} from 'react-native';
import {windowHeight} from '../utils/dimensions';

const Signin = () => {
  // const reduxtoken = useSelector(state => state.auth.userToken);

  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loginUser, {isLoading, error, data, isSuccess, isError}] =
    useLoginUserMutation();

  let res;
  const OnSignInPressed = async (email, password) => {
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
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .max(20, 'Invalid password')
                  .required('Required'),
                email: Yup.string()
                  .email('Invalid email address')
                  .required('Required'),
              })}
              onSubmit={values =>
                OnSignInPressed(values.email, values.password)
              }>
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <>
                  <View style={styles.maxWidth}>
                    <Custominput
                      label="Email ID"
                      name="email"
                      placeholder="Enter your email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {touched.email && errors.email ? (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}
                  </View>
                  <View style={styles.maxWidth}>
                    <Custominput
                      label="Password"
                      name="password"
                      placeholder="Enter your password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      isSecure={true}
                      setSecureText={setSecureText}
                      secureText={secureText}
                    />
                  </View>
                  {touched.password && errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  ) : null}
                  <Pressable
                    disabled={errors.email || errors.password ? true : false}
                    onPress={handleSubmit}
                    title="Submit"
                    style={styles.submitButton}>
                    <Text style={styles.loginText}>Login</Text>
                  </Pressable>
                </>
              )}
            </Formik>

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
  maxWidth: {
    width: '100%',
    marginBottom: '2%',
  },
  root: {
    alignItems: 'center',
    padding: 20,
    color: 'black',
    background: '',
  },
  logo: {
    maxWidth: 200,
    maxHeight: 175,
  },
  bgImage: {
    borderWidth: 1,
    borderColor: 'red',
    height: windowHeight,
  },
  textDesign: {
    fontSize: 15,
    marginLeft: 15,
    textAlignVertical: 'center',
  },
  errorText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'red',
    marginTop: 0,
  },
  submitButton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    backgroundColor: 'purple',
    borderRadius: 5,
    marginTop: '4%',
  },
  loginText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  },
});

export default Signin;
