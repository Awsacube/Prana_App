import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async value => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (error) {
    console.log(error);
  }
  console.log('Done.');
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.log(error);
  }
  console.log('Done.');
};

const removeToken = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
  console.log('Done.');
};

const storeRefreshToken = async value => {
  try {
    await AsyncStorage.setItem('refreshtoken', value);
  } catch (error) {
    console.log(error);
  }
  console.log('Done.');
};

const getRefreshToken = async () => {
  try {
    const token = await AsyncStorage.getItem('refreshtoken');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.log(error);
  }
  console.log('Done.');
};

export {storeToken, removeToken, getToken, storeRefreshToken, getRefreshToken};
