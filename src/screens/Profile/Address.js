import React, {useEffect, useState} from 'react';
import {
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  TextBase,
  View,
} from 'react-native';
import {Card} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getToken} from '../../services/AsyncStorageService';
import {useGetLoggedUserQuery} from '../../services/userAuthApi';
import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {windowHeight} from '../../utils/dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
// import ModalLayout from '../../components/ModalLayout';
import AddressModal from '../../components/modals/AddressModal';

const Address = ({navigation}) => {
  // const [userLToken, setUserLToken] = useState();

  // useEffect(() => {
  //   const getT = async () => {
  //     const token = await getToken(); //getting token from storage
  //     setUserLToken(token); //store token in local storage
  //   };
  //   getT();
  // }, []);

  // let Address = [];

  // const {data, isSuccess, isError, error} = useGetLoggedUserQuery(userLToken, {
  //   refetchOnMountOrArgChange: true,
  // });

  // isSuccess && Address.push(data.additional_address);

  // isError && console.log('errs', error);

  // if (isSuccess) {
  //   console.log(Address[0], 'dataadd');
  // }
  const [isModalVisible, setModalVisible] = useState(false);
  const addressData = [
    {
      id: '890156a6-508c-425d-98d0-7e4fab8ac364',
      name: 'Mobile',
      phoneNumber: '9998889998',
      houseNumber: '8-12/A',
      street: 'Hyper street',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500037',
      place: 'Home',
    },
    {
      id: '890156a6-508c-425d-98d0-7e4fab8ac363',
      name: 'Mobile',
      phoneNumber: '9998889998',
      houseNumber: '8-12/A',
      street: 'Hyper street',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500037',
      place: 'Office',
    },
    {
      id: '890156a6-508c-425d-98d0-7e4fab8ac362',
      name: 'Mobile',
      phoneNumber: '9998889998',
      houseNumber: '8-12/A',
      street: 'Hyper street',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500037',
      place: 'Other',
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // PanResponder for handling modal drag
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Implement dragging logic here if needed
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          closeModal();
        }
      },
    }),
  ).current;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={() => navigation.navigate('Account')}>
          <Text>Back</Text>
        </Pressable>
        <Text style={styles.title}>My Addresses</Text>
      </View>
      <View style={styles.margin}>
        <View style={styles.center}>
          <Pressable style={styles.addButton} onPress={() => openModal()}>
            <Entypo name="plus" size={25} />
            <Text style={styles.addText}>Add Address</Text>
          </Pressable>
        </View>

        <View style={[styles.mt, styles.savedRow]}>
          <Text style={styles.savedText}>Saved addresses</Text>
          <View style={styles.line} />
        </View>
      </View>
      <View style={[styles.addressBook, styles.margin]}>
        {addressData.map(address => (
          <View key={address.id} style={styles.addressContainer}>
            <View style={styles.addressRowContainer}>
              <Text style={styles.addressPlaceText}>{address.place}</Text>
              <View style={styles.addressModalContainer}>
                <Pressable
                  style={styles.addressIcon}
                  onPress={() => openModal()}>
                  <Entypo
                    name="edit"
                    size={16}
                    color={colors.gray_600}
                    // onClick={() => {
                    //   setModalVisible(true);
                    //   // setAdditionalAddress(address);
                    //   // setMethod('editAdditionalAddress');
                    // }}
                  />
                </Pressable>
                <Pressable style={styles.addressIcon}>
                  <Entypo
                    name="trash"
                    size={16}
                    color={colors.gray_600}
                    // onClick={() => {
                    //   handleDeleteUserAdditionalAddress(data, address.id);
                    // }}
                  />
                </Pressable>
              </View>
            </View>
            <View style={[styles.addressModalContainer, styles.mt2]}>
              <Text style={styles.addressUserName}>{address.name}</Text>
              <Text style={styles.addressPhoneText}>{address.phoneNumber}</Text>
            </View>
            <View style={styles.mt}>
              <Text style={styles.addressCompleteText}>
                {address.houseNumber}, {address.street}, {address.city}-
                {address.pinCode}, {address.state}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        statusBarTranslucent={true}>
        <Pressable style={styles.modalBackground} onPress={closeModal}>
          <View {...panResponder.panHandlers} style={styles.modalContainer}>
            <View style={styles.dragBar} />
            <View style={{marginTop: 15}}>
              <AddressModal />
            </View>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.powderWhite,
    height: windowHeight,
  },
  title: {
    fontSize: 20,
    color: colors.neutralBlack,
    fontWeight: '600',
    marginLeft: 20,
  },
  margin: {
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.powderWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_200,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  center: {
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors.pearlWhite,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
  },
  addText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
    color: colors.textPurple,
  },
  mt: {
    marginTop: 2,
    width: '100%',
  },
  mt2: {
    marginTop: 6,
    width: '100%',
  },
  savedText: {
    width: '40%',
    textTransform: 'uppercase',
    fontSize: 16,
    color: colors.gray_600,
    letterSpacing: 1,
    marginRight: '2%',
  },
  line: {
    width: '58%',
    borderBottomColor: colors.gray_400,
    borderBottomWidth: 1,
  },
  savedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressBook: {
    marginTop: 5,
  },
  addressContainer: {
    marginVertical: 8,
    backgroundColor: colors.pearlWhite,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 8,
  },
  addressRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressPlaceText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
    backgroundColor: colors.gray_200,
    textAlign: 'center',
    width: '18%',
    paddingVertical: 3,
    borderRadius: 5,
  },
  addressModalContainer: {
    flexDirection: 'row',
  },
  addressIcon: {
    marginLeft: 10,
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: colors.gray_400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  addressUserName: {
    fontSize: 15,
    color: colors.neutralBlack,
    fontWeight: '500',
  },
  addressPhoneText: {
    fontSize: 16,
    color: colors.neutralBlack,
    fontWeight: '500',
    marginLeft: 15,
  },
  addressCompleteText: {
    fontSize: 14,
    color: colors.gray_600,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    height: '85%', // Adjust as needed
  },
  dragBar: {
    width: 40,
    height: 5,
    backgroundColor: 'gray',
    borderRadius: 5,
    alignSelf: 'center',
  },
});
