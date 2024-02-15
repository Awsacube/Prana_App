import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Custominput from '../components/Custominput';
import Custombutton from '../components/Custombutton';
import {useNavigation} from '@react-navigation/native';
import background from '.././assets/signback.jpeg';
import Logo from '../assets/logo.png';

import {useRegisterUserMutation} from '../services/userAuthApi';
import {windowHeight} from '../utils/dimensions';
import {Formik} from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const [secureText, setSecureText] = useState(true);

  const navigation = useNavigation();

  const [registerUser] = useRegisterUserMutation();

  const OnSignup = async (
    first_name,
    last_name,
    email,
    password,
    phone_ext = '+91',
    phone_number,
  ) => {
    const formData = {
      first_name,
      last_name,
      email,
      password,
      phone_ext,
      phone_number,
    };
    const res = await registerUser(formData);
    console.log(res);
    navigation.navigate('Signin');
  };

  const OnSignInPressed = () => {
    navigation.navigate('Signin');
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={background} style={styles.image}>
          <View style={styles.root}>
            <Image
              source={Logo}
              style={[styles.logo, {height: windowHeight * 0.3}]}
              resizeMode="contain"
            />
            <Text style={styles.title}>Create an Account</Text>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: '',
              }}
              validationSchema={Yup.object({
                firstName: Yup.string()
                  .max(20, 'Invalid first name')
                  .required('Required'),
                lastName: Yup.string()
                  .max(20, 'Invalid last name')
                  .required('Required'),
                email: Yup.string()
                  .email('Invalid email address')
                  .required('Required'),
                phoneNumber: Yup.string()
                  .max(20, 'Invalid phone number')
                  .required('Required'),
                password: Yup.string()
                  .max(20, 'Invalid password')
                  .required('Required'),
              })}
              onSubmit={values =>
                OnSignup(
                  values.firstName,
                  values.lastName,
                  values.email,
                  values.password,
                  '+91',
                  values.phoneNumber,
                )
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
                      label="First Name"
                      name="firstName"
                      placeholder="Enter your first name"
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                    />
                    {touched.firstName && errors.firstName ? (
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    ) : null}
                  </View>
                  <View style={styles.maxWidth}>
                    <Custominput
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter your last name"
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                    />
                    {touched.lastName && errors.lastName ? (
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    ) : null}
                  </View>
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
                      label="Phone Number"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                    />
                    {touched.phoneNumber && errors.phoneNumber ? (
                      <Text style={styles.errorText}>{errors.phoneNumber}</Text>
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
                    {touched.password && errors.password ? (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}
                  </View>
                  <Pressable
                    disabled={
                      errors.firstName ||
                      errors.lastName ||
                      errors.email ||
                      errors.phoneNumber ||
                      errors.password
                        ? true
                        : false
                    }
                    onPress={handleSubmit}
                    title="Submit"
                    style={styles.submitButton}>
                    <Text style={styles.loginText}>Register</Text>
                  </Pressable>
                </>
              )}
            </Formik>
            {/* <Text style={styles.text}>By Registering Confirm That You Accept our {' '}<Text style={styles.link} onPress={onTermsPressed}>Terms Of Use </Text>And {' '}<Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text></Text> */}
            <Custombutton
              text="Have an account? Sign in"
              onPress={OnSignInPressed}
              type="TERTIARY"
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  phone: {
    display: 'flex',
    flexDirection: 'row',
  },
  maxWidth: {
    width: '100%',
    marginBottom: '2%',
  },
  SelectDropdown: {},
  phoneNum: {},
  root: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    maxWidth: 200,
    maxHeight: 175,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 5,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  image: {
    height: windowHeight,
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
  errorText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'red',
  },
});

export default Signup;
