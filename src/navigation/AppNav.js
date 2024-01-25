import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import AppStack from '../navigation/AppStack';
import AuthStack from '../navigation/AuthStack';
import {getToken} from '../services/AsyncStorageService';

const AppNav = () => {
  const token = useSelector(state => state.auth.userToken);

  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken();
      setUserLToken(token);
    };
    getT();
  }, []);

  // console.log(userLToken, 'ltokenatappnav');

  return (
    <NavigationContainer>
      {token === 0 ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
