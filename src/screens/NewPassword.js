import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Custominput from '../components/Custominput';
import Custombutton from '../components/Custombutton';
import SocialSigninButton from '../components/SocialSigninButton';
import {useNavigation} from '@react-navigation/native';

const NewPass = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const OnSignin = () => {
    console.warn('signin');
    navigation.navigate('signin');
  };

  const OnSubmitPressed = () => {
    console.warn('submit');
    navigation.navigate('HomeScreen');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        {/* <Image source={Logo} style={[styles.logo,{height:height*0.3}]} resizeMode='contain'/>  */}
        <Text style={styles.title}>Reset Your Password</Text>
        <Custominput placeholder="Code" value={code} setValue={setCode} />
        <Custominput
          placeholder="Enter New Password"
          value={newPassword}
          setValue={setNewPassword}
        />
        <Custombutton text="Submit" onPress={OnSubmitPressed} />
        <Custombutton
          text="Back to Signin"
          onPress={OnSignin}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
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
});

export default NewPass;
