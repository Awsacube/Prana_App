import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Appearance, Pressable, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../app/auth-slice';
import {getToken, removeToken} from '../../services/AsyncStorageService';
import {
  useGetLoggedUserQuery,
  useUserLogOutMutation,
} from '../../services/userAuthApi';

export default function Profile() {
  const reduxtoken = useSelector(state => state.auth.userToken);
  const [userLToken, setUserLToken] = useState();
  const [count, setCount] = useState(0);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const navigation = useNavigation();

  const {data, isSuccess} = useGetLoggedUserQuery(userLToken, {
    refetchOnMountOrArgChange: true,
  });

  const profile = [];

  if (isSuccess) {
    profile.push(data);
  }

  const [logoutUser] = useUserLogOutMutation();

  const onLogoutPressed = async () => {
    dispatch(login());
    const res = await logoutUser(userLToken);

    removeToken();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {profile.map((item, index) => (
          <View style={styles.productname}>
            <Text style={{color: 'black'}}>{item.first_name}</Text>
            <Text style={{color: 'black'}}>{item.email}</Text>
          </View>
        ))}

        <View style={styles.listLayout}>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.4,
            }}
          />
          <Pressable onPress={() => navigation.navigate('EditProfile')}>
            <View style={styles.listItem}>
              <View style={styles.iconDesign}>
                <Icon name="account" size={25} color="#E73631" />
              </View>
              <Text style={styles.textDesign}>Edit Profile</Text>
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0.4,
              }}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Address')}>
            <View style={styles.listItem}>
              <View style={styles.iconDesign}>
                <Icon name="account" size={25} color="#E73631" />
              </View>
              <Text style={styles.textDesign}>Manage Address</Text>
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0.4,
              }}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('OrderHistory')}>
            <View style={styles.listItem}>
              <View style={styles.iconDesign}>
                <Icon name="shopping" size={25} color="#E73631" />
              </View>

              <Text style={styles.textDesign}>Order History</Text>
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0.4,
              }}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('WishList')}>
            <View style={styles.listItem}>
              <View style={styles.iconDesign}>
                <Icon name="heart-circle" size={25} color="#E73631" />
              </View>

              <Text style={styles.textDesign}>Wish List</Text>
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 0.4,
              }}
            />
          </Pressable>
          <View style={styles.listItem}>
            <View style={styles.iconDesign}>
              <Icon name="headphones" size={25} color="#E73631" />
            </View>

            <Text style={styles.textDesign}>Need Help</Text>
          </View>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={styles.listItem}>
            <View style={styles.iconDesign}>
              <Icon name="sticker-text" size={25} color="#E73631" />
            </View>

            <Text style={styles.textDesign}>Terms & Conditions</Text>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={styles.listItem}>
            <View style={styles.iconDesign}>
              <Icon name="security" size={25} color="#E73631" />
            </View>

            <Text style={styles.textDesign}>Privacy Policies</Text>
          </View>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={styles.listItem}>
            <View style={styles.iconDesign}>
              <Icon name="chat-question" size={25} color="#E73631" />
            </View>

            <Text style={styles.textDesign}>FAQ's</Text>
          </View>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.listItem}>
            <View style={styles.iconDesign}>
              <Icon name="logout" size={25} color="#E73631" />
            </View>

            <Text style={styles.textDesign} onPress={onLogoutPressed}>
              Logout
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  imageLayout: {
    width: 35,
    height: 35,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 22,
    height: 22,
  },
  text: {
    textAlignVertical: 'center',
    marginLeft: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: '#2874A6',
    borderWidth: 3,
    marginLeft: 15,
    marginTop: 10,
  },
  profileText: {
    width: 80,
    textAlign: 'center',
    marginLeft: 15,
    marginBottom: 5,
  },
  listLayout: {
    backgroundColor: '#fff',
    // elevation: 8,
    marginLeft: 10,
    marginRight: 10,
    padding: 12,
    borderRadius: 10,
  },
  iconDesign: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#D6DBDF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDesign: {
    fontSize: 15,
    marginLeft: 15,
    textAlignVertical: 'center',
    color: '#000',
  },
  productname: {
    fontSize: 50,
    color: '#000',
    textAlign: 'center',
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  listItem: {
    flexDirection: 'row',
    margin: 10,
  },
});
