import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Custombutton from '../../components/Custombutton';
import {getToken} from '../../services/AsyncStorageService';
import {
  useEditProfileMutation,
  useGetLoggedUserQuery,
} from '../../services/userAuthApi';

const EditProfile = () => {
  const navigation = useNavigation();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setMobile] = useState('');
  const [street_1, setStreet_1] = useState('');
  const [street_2, setStreet_2] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState();
  const [pincode, setPincode] = useState('');
  const [userLToken, setUserLToken] = useState();

  // setFirstName(item.first_name)
  // setLastName(item.last_name)
  // setMobile(item.phone_number)
  // setStreet_1(item.address.street_1)
  // setStreet_2(item.address.street_2)
  // setCity(item.address.city)
  // setDistrict(item.address.district)
  // setPincode(item.address.pincode)
  // setState(item.address.state)

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const [editProfile] = useEditProfileMutation(userLToken);

  const Save = async () => {
    const newData = {
      first_name,
      last_name,
      phone_number,
      userLToken,
      city,
      state,
      district,
      pincode,
      street_1,
      street_2,
    };
    const {data, isSuccess, error} = await editProfile(newData);
    navigation.navigate('Home');
  };

  const {data, isSuccess} = useGetLoggedUserQuery(userLToken, {
    refetchOnMountOrArgChange: true,
  });

  const profile = [];

  {
    isSuccess && profile.push(data);
  }

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={profile}
          keyExtractor={(item, index) => item.uuid}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View style={styles.container}>
                <Text>First Name</Text>
                <TextInput
                  defaultValue={item.first_name}
                  type="outlined"
                  style={styles.input}
                  onChangeText={e => setFirstName(e)}
                />
                <Text>Second Name</Text>
                <TextInput
                  defaultValue={item.last_name}
                  style={styles.input}
                  onChangeText={e => setLastName(e)}
                />
                <Text>10 Digit Mobile</Text>
                <TextInput
                  defaultValue={item.phone_number}
                  style={styles.input}
                  onChangeText={e => setMobile(e)}
                />
                <Custombutton text="Save" onPress={Save} />
              </View>
            );
          }}
        />
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
    borderWidth: 1,
    margin: 5,
    borderRadius: 15,
  },
  container: {
    marginTop: 25,
  },
});
