import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useGetLoggedUserQuery} from '../services/userAuthApi';
import {getToken} from '../services/AsyncStorageService';
import {colors} from '../constants/colors';
import adjust from '../utils/responsive';
import RadioButton from 'react-native-radio-buttons-group';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DeliveryAddress = ({navigation}) => {
  const [userLToken, setUserLToken] = useState();
  const [profileData, setProfileData] = useState();

  const [additionalAddress, setAdditionalAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

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

  useEffect(() => {
    if (isSuccess && data && data.additional_address) {
      setAdditionalAddress(data.additional_address);
    }
  }, [isSuccess, data]);

  const radioButtons = useMemo(() => {
    let allAddresses = [];
    if (userLToken && data && Object.keys(data.address).length > 0) {
      allAddresses.push({
        value: `${data.address.houseNumber}, ${data.address.street}, ${data.address.city} - ${data.address.pinCode}, ${data.address.state}`,
        place: data.address.place,
        name: data.address.name,
        houseNumber: data.address.houseNumber,
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        pinCode: data.address.pinCode,
      });
    }
    if (additionalAddress.length > 0) {
      allAddresses = [
        ...allAddresses,
        ...additionalAddress.map((address, index) => ({
          value: `${address.houseNumber}, ${address.street}, ${address.city} - ${address.pinCode}, ${address.state}`,
          place: address.place,
          name: address.name,
          houseNumber: address.houseNumber,
          street: address.street,
          city: address.city,
          state: address.state,
          pinCode: address.pinCode,
          phoneNumber: address.phoneNumber,
        })),
      ];
    }
    return allAddresses;
  }, [additionalAddress, data, userLToken]);

  const handleAddressSelect = selectedAddress => {
    setSelectedAddress(selectedAddress);
  };

  const AddressCard = ({buttonData, value, selected, onPress}) => {
    return (
      <Pressable onPress={() => onPress(value)}>
        <View style={styles.addressCard}>
          <View style={styles.radioIcon}>
            {/* Add a custom radio icon here, e.g., using an image or View */}
            {selected ? (
              <MaterialIcons
                name="circle-slice-8"
                color={colors.azureBlue}
                size={25}
              />
            ) : (
              <MaterialIcons name="circle-outline" size={25} />
            )}
          </View>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressTextName}>{buttonData.name}</Text>
            <Text style={styles.addressText}>
              {buttonData.houseNumber}, {buttonData.street}, {buttonData.city},{' '}
              {buttonData.state}, {buttonData.pinCode}
            </Text>
            <Text style={styles.addressText}>
              Phone number: {buttonData.phoneNumber}
            </Text>
            {selected && (
              <Pressable style={styles.deliverButton}>
                <Text style={styles.deliverButtonText}>
                  Deliver to this address
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cancelContainer}>
        <Pressable onPress={() => navigation.navigate('CartContainer')}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </Pressable>
      </View>
      <View style={styles.addAddressButtonContainer}>
        <Pressable style={styles.addAddressButton}>
          <Text style={styles.addAddressButtonText}>
            Add a delivery address
          </Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.title}>Select a delivery address</Text>
      </View>
      <View style={styles.addressContainer}>
        {radioButtons.map((radioButton, index) => (
          <AddressCard
            key={index}
            value={radioButton.value}
            selected={selectedAddress === radioButton.value}
            onPress={handleAddressSelect}
            buttonData={radioButton}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default DeliveryAddress;

const styles = StyleSheet.create({
  //   container: {
  //     paddingHorizontal: 10,
  //     paddingVertical: 10,
  //   },
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
    marginBottom: 10,
  },
  addressContainer: {
    paddingHorizontal: 10,
  },
  addressCard: {
    backgroundColor: colors.pearlWhite,
    padding: 5,
    marginVertical: 5,
    borderRadius: 10, // Add rounded corners for card-like appearance
    flexDirection: 'row',
    alignItems: 'center',
    height: 160,
  },
  selectedAddressCard: {
    backgroundColor: colors.lightBlue, // Highlight selected card
  },
  radioIcon: {
    marginLeft: 10,
  },
  addressText: {
    fontSize: 16,
    color: colors.gray_600,
    // marginLeft: 10,
  },
  addressTextContainer: {
    width: '80%',
    marginLeft: 15,
  },
  addressTextName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutralBlack,
    marginBottom: '1%',
    textTransform: 'capitalize',
  },
  deliverButton: {
    width: '100%',
    backgroundColor: 'purple',
    padding: 8,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  deliverButtonText: {
    color: colors.pearlWhite,
    fontSize: 15,
  },
  addAddressButtonContainer: {
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  addAddressButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addAddressButtonText: {
    fontSize: 16,
    color: 'purple',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});
