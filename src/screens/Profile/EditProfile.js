import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getToken} from '../../services/AsyncStorageService';
import {
  useEditProfileMutation,
  useGetLoggedUserQuery,
} from '../../services/userAuthApi';
import Custominput from '../../components/Custominput';
import {colors} from '../../constants/colors';

const EditProfile = () => {
  const navigation = useNavigation();

  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const [editProfile] = useEditProfileMutation(userLToken);

  const {data, isSuccess, refetch} = useGetLoggedUserQuery(userLToken, {
    refetchOnMountOrArgChange: true,
  });

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  useEffect(() => {
    if (data) {
      setUserData({
        firstName: data?.first_name,
        lastName: data?.last_name,
        email: data?.email,
        phoneNumber: data?.phone_number,
      });
    }
  }, [data]);

  const [edit, setEdit] = useState(false);

  const profile = [];

  {
    isSuccess && profile.push(data);
  }

  const handleSave = async () => {
    const newData = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      phone_number: userData.phoneNumber,
      userLToken,
    };
    const {data, isSuccess, error} = await editProfile(newData);
    refetch();
    navigation.navigate('Account');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.mb}>
          <Custominput
            label={'First Name'}
            name={'firstName'}
            value={edit ? userData.firstName : data?.first_name}
            onChangeText={text => setUserData({...userData, firstName: text})}
            disabled={!edit}
          />
        </View>
        <View style={styles.mb}>
          <Custominput
            label={'Last Name'}
            name={'lastName'}
            value={edit ? userData.lastName : data?.last_name}
            onChangeText={text => setUserData({...userData, lastName: text})}
            disabled={!edit}
          />
        </View>
        <View style={styles.mb}>
          <Custominput
            label={'First Name'}
            name={'firstName'}
            value={edit ? userData.email : data?.email}
            onChangeText={text => setUserData({...userData, email: text})}
            disabled={true}
          />
        </View>
        <View style={styles.mb}>
          <Custominput
            label={'Phone Number'}
            name={'phoneNumber'}
            value={edit ? userData.phoneNumber : data?.phone_number}
            onChangeText={text => setUserData({...userData, phoneNumber: text})}
            disabled={!edit}
          />
        </View>
        <Pressable onPress={() => setEdit(!edit)} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>
            {edit ? 'Cancel' : 'Edit'}
          </Text>
        </Pressable>
        <Pressable onPress={() => handleSave()} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 15,
  },
  container: {
    marginTop: 25,
    paddingHorizontal: 15,
  },
  mb: {
    marginBottom: 8,
  },
  button: {
    marginTop: 14,
    width: '100%',
    backgroundColor: 'purple',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: colors.pearlWhite,
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: 'purple',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'purple',
    fontWeight: '500',
  },
});
