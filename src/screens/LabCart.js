import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  Modal,
  PanResponder,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from './CartItem';
import {store} from '../app/store';
import {clearCart} from '../features/cartSlice';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useGetAllLabCartItemsQuery,
  useTestsAndPackagesByIdQuery,
  useDeleteLabCartItemsMutation,
  useAddToCartMutation,
} from '../services/userAuthApi';
import {getToken} from '../services/AsyncStorageService';
// import { black } from 'react-native-paper/lib/typescript/styles/colors'
import {ConstantId} from './token';
import {cartActions} from '../app/cart-slice';
import {useFocusEffect} from '@react-navigation/native';
import Spinner from '../components/Spinner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import adjust from '../utils/responsive';
import {colors} from '../constants/colors';

const LabCart = () => {
  // const cart=useSelector((state)=>state.cart)
  const [selected, setSelected] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  let total = 0;

  let itemsList = useSelector(state => state.cart.itemsList);

  itemsList.forEach(item => {
    total += item.totalPrice;
  });

  const [userLToken, setUserLToken] = useState();

  const [fresh, refresh] = useState(1);

  console.warn('itemList', itemsList);

  let cart = [];

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const {data, isLoading, isFetching, error, isSuccess, refetch} =
    useGetAllLabCartItemsQuery(userLToken, {refetchOnMountOrArgChange: true});

  {
    isSuccess && console.warn('cart data', data.data);
  }

  {
    isSuccess &&
      data.data.forEach(element => {
        const cartItemUuid = element.uuid;
        const quantity = element.quantity;
        const name = element.lab_test.name;
        const image = element.lab_test.image;
        const uuid = element.lab_test.uuid;
        const price = element.lab_test.price;
        const discount = element.lab_test.discount;
        cart.unshift({
          name: name,
          image: image,
          uuid: uuid,
          price: price,
          quantity: quantity,
          cartItemUuid: cartItemUuid,
          discount: discount,
        });
      });
  }

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
        // Close the modal if dragged down (you can customize this logic)
        if (gestureState.dy > 50) {
          closeModal();
        }
      },
    }),
  ).current;

  const handleDelete = item => {
    setSelected(item);
    openModal();
  };

  const [deleteCartItems] = useDeleteLabCartItemsMutation();
  const removeFromCartHandler = async cartItemid => {
    const remove = {
      id: cartItemid,
      token: userLToken,
    };
    await deleteCartItems(remove);
    refetch();
  };

  const totalValue = item => {
    return item.item.price - (item.item.price * item.item.discount) / 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner></Spinner>}
      {isSuccess && (
        <FlatList
          data={cart}
          // keyExtractor={item => item.item.uuid}
          renderItem={item => {
            return (
              <>
                <View style={styles.mainContainer}>
                  <View>
                    <Image
                      style={styles.image}
                      source={{uri: item.item.image}}
                    />
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.title}>{item.item.name}</Text>
                    <View style={[styles.priceFlex]}>
                      <Text style={styles.mrp}>MRP</Text>
                      <Text style={styles.price}>₹{totalValue(item)}</Text>
                      <Text style={styles.priceOverline}>
                        ₹{parseFloat(item.item.price).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    style={styles.cartBtn}
                    onPress={() => handleDelete(item.item)}>
                    <Icon
                      name="delete"
                      style={styles.cartBtnText}
                      color="#000"
                    />
                  </Pressable>
                </View>
                <Modal
                  visible={isModalVisible}
                  transparent
                  animationType="slide"
                  statusBarTranslucent={true}>
                  <Pressable
                    style={styles.modalBackground}
                    onPress={closeModal}>
                    <View
                      {...panResponder.panHandlers}
                      style={styles.modalContainer}>
                      <View style={styles.dragBar} />
                      <View style={styles.modal}>
                        <View style={styles.gap}>
                          <Text style={styles.removeHeading}>
                            Are You Sure you want to Remove
                            <Text style={styles.productModalText}>
                              {' '}
                              {selected?.name}{' '}
                            </Text>
                            from wishlist?
                          </Text>

                          <View style={styles.rowContainer}>
                            <Pressable
                              onPress={() =>
                                removeFromCartHandler(item.item.cartItemUuid)
                              }
                              style={[styles.btn, styles.modalRemoveBtn]}>
                              <Text
                                style={[
                                  styles.btnText,
                                  styles.modalRemoveBtnText,
                                ]}>
                                Remove
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </Modal>
              </>
            );
          }}
        />
      )}
      <View style={styles.billContainer}>
        <View style={styles.justify}>
          <Text style={styles.billText}>Total</Text>
          <Text style={styles.billText}>₹{total}</Text>
        </View>
        <View style={styles.justify}>
          <Text style={styles.billText}>Sample Collection Charges</Text>
          <Text style={styles.billText}>₹{total}</Text>
        </View>
        <View style={styles.justify}>
          <Text style={styles.billText}>Place Order</Text>
          <Text style={styles.billText}>₹{total}</Text>
        </View>
        <View style={styles.border} />
        <View style={styles.justify}>
          <Text style={styles.billTotalText}>Cart Value</Text>
          <Text style={styles.billTotalText}>₹{total}</Text>
        </View>
      </View>
      <Pressable style={styles.placeButton}>
        <Text style={styles.placeText}>Place Order</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default LabCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlWhite,
  },
  mainContainer: {
    flexDirection: 'row',
    height: adjust(130),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray_400,
    padding: adjust(5),
    borderRadius: 10,
    backgroundColor: colors.pearlWhite,
    marginVertical: adjust(3),
    position: 'relative',
    marginHorizontal: adjust(5),
    marginTop: adjust(5),
  },
  image: {
    width: adjust(110),
    height: adjust(110),
    borderRadius: adjust(5),
    objectFit: 'scale-down',
    marginHorizontal: adjust(5),
    marginRight: adjust(15),
  },
  details: {
    marginRight: adjust(10),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '50%',
    marginTop: adjust(-25),
  },
  title: {
    fontSize: adjust(14),
    color: colors.black,
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: adjust(5),
  },
  priceFlex: {
    flexDirection: 'row',
    padding: adjust(5),
    alignItems: 'flex-end',
    marginBottom: adjust(5),
    borderRadius: adjust(5),
  },
  mrp: {
    fontSize: adjust(12),
    color: colors.azureBlue,
    fontWeight: '400',
    textAlign: 'center',
    marginRight: adjust(5),
  },
  price: {
    fontSize: adjust(12),
    color: colors.black,
    fontWeight: '500',
    textAlign: 'center',
  },
  priceOverline: {
    fontSize: adjust(10),
    color: colors.gray_600,
    fontWeight: '500',
    textAlign: 'center',
    textDecorationLine: 'line-through',
    marginLeft: adjust(5),
  },
  cartBtn: {
    padding: adjust(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: adjust(50),
    position: 'absolute',
    top: 0,
    right: 0,
  },
  cartBtnText: {
    color: colors.red,
    fontWeight: '500',
    fontSize: adjust(18),
  },
  emptyImageContainer: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  emptyImage: {
    width: adjust(300),
    height: adjust(300),
    objectFit: 'contain',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: adjust(10),
    borderTopRightRadius: adjust(10),
    paddingHorizontal: adjust(15),
    height: '18%',
  },
  modal: {
    height: '100%',
    paddingVertical: adjust(10),
  },
  dragBar: {
    width: 40,
    height: 5,
    backgroundColor: 'gray',
    borderRadius: adjust(5),
    alignSelf: 'center',
    marginTop: adjust(10),
  },
  productModalText: {
    fontSize: adjust(14),
    color: colors.azureBlue,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: adjust(5),
  },
  removeHeading: {
    fontSize: adjust(13),
    color: colors.neutralBlack,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: adjust(2),
  },
  btn: {
    marginTop: adjust(10),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: adjust(10),
    borderRadius: adjust(5),
  },
  btnText: {
    fontSize: adjust(12),
    fontWeight: '500',
  },
  modalRemoveBtn: {
    backgroundColor: colors.azureBlue,
  },
  modalSaveBtn: {
    backgroundColor: colors.pearlWhite,
    borderWidth: 1,
    borderColor: colors.azureBlue,
  },
  modalRemoveBtnText: {
    color: colors.pearlWhite,
    fontWeight: '500',
    fontSize: adjust(11),
  },
  modalSaveBtnText: {
    color: colors.azureBlue,
    fontWeight: '500',
    fontSize: adjust(12),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  evenly: {
    height: '10%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    height: adjust(25),
    width: adjust(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pearlWhite,
    borderWidth: 1,
    borderColor: colors.azureBlue,
    borderRadius: adjust(5),
  },
  bold: {
    fontSize: adjust(13),
    fontWeight: 'bold',
    color: colors.azureBlue,
    width: '100%',
    paddingHorizontal: adjust(10),
  },
  placeButton: {
    width: '100%',
    backgroundColor: colors.azureBlue,
    paddingVertical: adjust(10),
  },
  placeText: {
    textAlign: 'center',
    fontSize: adjust(14),
    fontWeight: '500',
    color: colors.pearlWhite,
  },
  billContainer: {
    width: '100%',
    backgroundColor: colors.backgroundBlue,
    paddingVertical: adjust(10),
    paddingHorizontal: adjust(5),
  },
  justify: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billText: {
    fontSize: adjust(13),
    fontWeight: '500',
    color: colors.gray_600,
    marginVertical: adjust(1),
  },
  border: {
    borderTopWidth: 1,
    borderColor: colors.gray_400,
    marginVertical: adjust(6),
  },
  billTotalText: {
    fontSize: adjust(15),
    fontWeight: 'bold',
    color: colors.neutralBlack,
  },
});
