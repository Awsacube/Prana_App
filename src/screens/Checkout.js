import {
  Modal,
  PanResponder,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useGetLoggedUserQuery} from '../services/userAuthApi';
import {getToken} from '../services/AsyncStorageService';
import {colors} from '../constants/colors';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Checkout = ({navigation}) => {
  const [userLToken, setUserLToken] = useState();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const {data, isSuccess, isError, error, refetch} = useGetLoggedUserQuery(
    userLToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (isSuccess) {
      setProfileData(data);
    }
  }, [isSuccess, data]);

  isError && console.log('errs', error);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cancelContainer}>
        <Pressable onPress={() => navigation.navigate('CartContainer')}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.title}>Order now</Text>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  cancelContainer: {
    width: '100%',
    backgroundColor: 'purple',
    padding: 14,
  },
  cancelText: {
    marginLeft: 'auto',
    color: colors.white,
    fontWeight: '700',
  },
  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
