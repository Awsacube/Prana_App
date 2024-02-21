import React, {useEffect, useState} from 'react';
import {
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {getToken} from '../../services/AsyncStorageService';
import {useGetLoggedUserQuery} from '../../services/userAuthApi';
import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {windowHeight} from '../../utils/dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddressModal from '../../components/modals/AddressModal';
import {
  handleDeleteUserAdditionalAddress,
  handleDeleteUserAddress,
} from '../../services/profileService';
import adjust from '../../utils/responsive';

const Address = ({navigation, route}) => {
  const [userLToken, setUserLToken] = useState();
  const [profileData, setProfileData] = useState();

  const [method, setMethod] = useState();
  const [additionalAddress, setAdditionalAddress] = useState(null);

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

  if (isSuccess) {
    console.log(data);
  }
  const [isModalVisible, setModalVisible] = useState(false);

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
          <AntDesign name="arrowleft" size={20} color={'black'} />
        </Pressable>
        <Text style={styles.title}>My Addresses</Text>
      </View>
      <View style={styles.margin}>
        <View style={styles.center}>
          <Pressable
            style={styles.addButton}
            onPress={() => {
              openModal();
              setMethod('add');
            }}>
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
        {profileData && Object.keys(profileData.address).length > 1 && (
          <View key={profileData.address.id} style={styles.addressContainer}>
            <View style={styles.addressRowContainer}>
              <Text style={styles.addressPlaceText}>
                {profileData.address.place}
              </Text>
              <View style={styles.addressModalContainer}>
                <Pressable
                  style={styles.addressIcon}
                  onPress={() => {
                    setMethod('edit');
                    openModal();
                  }}>
                  <Entypo name="edit" size={16} color={colors.gray_600} />
                </Pressable>
                <Pressable
                  style={styles.addressIcon}
                  onPress={() => handleDeleteUserAddress(userLToken, refetch)}>
                  <Entypo name="trash" size={16} color={colors.gray_600} />
                </Pressable>
              </View>
            </View>
            <View style={[styles.addressModalContainer, styles.mt2]}>
              <Text style={styles.addressUserName}>
                {profileData.address.name}
              </Text>
              <Text style={styles.addressPhoneText}>
                {profileData.address.phoneNumber}
              </Text>
            </View>
            <View style={styles.mt}>
              <Text style={styles.addressCompleteText}>
                {profileData.address.houseNumber}, {profileData.address.street},{' '}
                {profileData.address.city}-{profileData.address.pinCode},{' '}
                {profileData.address.state}
              </Text>
            </View>
          </View>
        )}
        {data &&
          data.additional_address &&
          data.additional_address.map(address => (
            <View key={address.id} style={styles.addressContainer}>
              <View style={styles.addressRowContainer}>
                <Text style={styles.addressPlaceText}>{address.place}</Text>
                <View style={styles.addressModalContainer}>
                  <Pressable
                    style={styles.addressIcon}
                    onPress={() => {
                      openModal();
                      setAdditionalAddress(address);
                      setMethod('editAdditionalAddress');
                    }}>
                    <Entypo name="edit" size={16} color={colors.gray_600} />
                  </Pressable>
                  <Pressable
                    style={styles.addressIcon}
                    onPress={() =>
                      handleDeleteUserAdditionalAddress(
                        profileData,
                        address.id,
                        userLToken,
                        refetch,
                      )
                    }>
                    <Entypo name="trash" size={16} color={colors.gray_600} />
                  </Pressable>
                </View>
              </View>
              <View style={[styles.addressModalContainer, styles.mt2]}>
                <Text style={styles.addressUserName}>{address.name}</Text>
                <Text style={styles.addressPhoneText}>
                  {address.phoneNumber}
                </Text>
              </View>
              <View style={styles.mt}>
                <Text style={styles.addressCompleteText}>
                  {address.houseNumber}, {address.street}, {address.city}-
                  {address.pinCode}, {address.state}
                </Text>
              </View>
            </View>
          ))}
        {profileData &&
          Object.keys(profileData.address).length < 1 &&
          profileData.additional_address.length < 1 && (
            <View style={styles.mt2}>
              <Text>
                No Address Found ! <Text>Please Add one...</Text>
              </Text>
            </View>
          )}
      </View>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        statusBarTranslucent={true}>
        <Pressable style={styles.modalBackground} onPress={closeModal}>
          <View {...panResponder.panHandlers} style={styles.modalContainer}>
            <View style={styles.dragBar} />
            <View style={styles.mt3}>
              <AddressModal
                data={profileData}
                method={method}
                additionalAddress={additionalAddress}
                closeModal={closeModal}
                token={userLToken}
                refetch={refetch}
              />
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
  mt3: {
    marginTop: adjust(10),
  },
  savedText: {
    width: '41%',
    textTransform: 'uppercase',
    fontSize: adjust(13),
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
