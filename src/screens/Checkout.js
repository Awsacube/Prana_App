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

import Entypo from 'react-native-vector-icons/Entypo';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import adjust from '../utils/responsive';

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
      <View style={styles.billContainer}>
        <Text style={styles.title}>Order now</Text>
        <View style={styles.cardContainer}>
          <Text style={styles.text}>
            Shipping to:<Text style={styles.boldText}>addr</Text>
          </Text>
          <View style={styles.border} />
          <View style={styles.flexContainer}>
            <Text style={styles.text}>Items:</Text>
            <Text style={styles.text}>665</Text>
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.text}>Delivery:</Text>
            <Text style={styles.text}>665</Text>
          </View>
          <View style={[styles.flexContainer, styles.padding]}>
            <Text style={styles.boldText}>Order Total:</Text>
            <Text style={styles.boldText}>665</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.flexContainer}>
            <Text style={styles.text}>COD</Text>
            <Entypo
              name={'chevron-small-right'}
              size={12}
              color={colors.gray_600}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pearlWhite,
    flex: 1,
  },
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
    marginVertical: 10,
  },
  billContainer: {
    paddingHorizontal: adjust(5),
  },
  cardContainer: {
    borderWidth: 0.4,
    borderColor: colors.azureBlue,
    backgroundColor: colors.backgroundBlue,
    // paddingHorizontal: adjust(10),
    paddingVertical: adjust(5),
    borderRadius: adjust(5),
    marginVertical: adjust(3),
  },
  text: {
    fontSize: adjust(12),
    fontWeight: '400',
    color: colors.neutralBlack,
    paddingHorizontal: adjust(10),
    textTransform: 'capitalize',
  },
  border: {
    borderWidth: 0.4,
    borderColor: colors.azureBlue,
    marginVertical: adjust(5),
  },
  boldText: {
    fontSize: adjust(13),
    fontWeight: '500',
    textTransform: 'capitalize',
    color: colors.neutralBlack,
    overflow: 'hidden',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  padding: {
    paddingHorizontal: adjust(10),
  },
});
