import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {setPostalCode, setlocation} from '../app/location-slice';
import {useDispatch, useSelector} from 'react-redux';
const StoresNearMe = ({navigation}) => {
  const dispatch = useDispatch();

  const latlongdata = useSelector(state => state.location.latlong);
  const postalCode = useSelector(state => state.location.postalCode);

  const [storeData, setStoreData] = useState([]);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to show your position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission denied. Location permission is mandatory to register. Please grant permission to access your location.',
            [
              {
                text: 'OK',
                onPress: async () => {
                  // Request location permission again
                  await requestLocationPermission();
                },
              },
            ],
            {cancelable: false},
          );
        }
      } else {
        getLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch(setlocation(position));
      },
      error => {
        Alert.alert('Error', error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const fetchAddressDetails = async (latitude, longitude, pincode) => {
    if (latitude && longitude) {
      // Fetch address details based on latitude and longitude
      try {
        const response = await fetch(
          `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=rbLu4IeRUFqNYuSvoknP6OlSdMqTro11FWcE8vpZLsg`,
        );
        const data = await response.json();
        const addressComponents = data.items[0].address;
        dispatch(setPostalCode(addressComponents.postalCode));
        return {
          city: addressComponents.city,
          state: addressComponents.state,
          pincode: addressComponents.postalCode,
          address:
            addressComponents.street + ', ' + addressComponents.subdistrict,
        };
      } catch (error) {
        console.error('Error fetching address:', error);
        return null;
      }
    } else if (pincode) {
      // Fetch address details based on pincode
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`,
        );
        const data = await response.json();
        if (data[0].Status === 'Success') {
          const addressComponents = data[0].PostOffice[0];
          return {
            city: addressComponents.Block,
            state: addressComponents.State,
            pincode: addressComponents.Pincode,
            address: addressComponents.Name,
          };
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        return null;
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    fetchAddressDetails(latlongdata.latitude, latlongdata.longitude, null);
  }, [latlongdata]);

  const getStores = async () => {
    try {
      if (latlongdata.latitude !== null && latlongdata.longitude !== null) {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(
          'http://192.168.1.12:4000/api/v1/shop-details/near-me',
          {
            latitude: latlongdata.latitude,
            longitude: latlongdata.longitude,
            pin_code: postalCode,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        );
        console.log(response.data); // Log the response data
        setStoreData(response.data?.data);
      } else {
        // Handle the case when latitude and/or longitude are null
        console.log('Latitude or longitude is null');
      }
    } catch (error) {
      console.log('Error fetching stores:', error); // Log any errors
    }
  };

  useEffect(() => {
    if (postalCode) {
      getStores();
    }
  }, [postalCode]);

  return (
    <View>
      <Pressable onPress={() => navigation.navigate('Account')}>
        <Text>Back</Text>
      </Pressable>
      <Text style={{color: 'black', fontSize: 18, marginBottom: 10}}>
        Stores Near Me{' '}
      </Text>
      <View style={{gap: 5}}>
        {storeData.length > 0 &&
          storeData.map((store, index) => (
            <View
              key={index}
              style={{borderBottomWidth: 1, borderBottomColor: 'gray'}}>
              <Text style={{color: 'black'}}>{store.shop_name}</Text>
              <Text style={{color: 'black'}}>{store.distance?.text}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default StoresNearMe;

const styles = StyleSheet.create({});
