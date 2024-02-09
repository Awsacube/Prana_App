import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  PanResponder,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  useAddToCartMutation,
  useDeleteWishlistItemsMutation,
  useWishListQuery,
} from '../services/userAuthApi';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getToken} from '../services/AsyncStorageService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import adjust from '../utils/responsive';
import {colors} from '../constants/colors';

export default function WishList({route}) {
  const [selected, setSelected] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const productList = [];

  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const queryItems = {token: userLToken};

  const res = useWishListQuery(queryItems);

  // ,{ refetchOnMountOrArgChange: true }

  if (res.isSuccess === true) {
    console.log('wishlistdataproduct', res.data);
    // console.log(res.data[0].uuid);
    const data = Array.from(res.data);
    data.forEach(element => {
      const name = element.product.name;
      const image = element.product.image;
      const price = element.product.price;
      const uuid = element.uuid;
      const productId = element.product.uuid;
      const discount = element.product.discount;
      //   const description=element.description;
      productList.unshift({
        name: name,
        image: image,
        uuid: uuid,
        price: price,
        productId: productId,
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

  const [removeProduct] = useDeleteWishlistItemsMutation();
  const {refetch} = useWishListQuery(queryItems);
  const [addToCart] = useAddToCartMutation(); //send cart data to backend

  const addToCartHandler = async wishlistItem => {
    const cartData = {
      id: wishlistItem.productId,
      quantity: 1,
      token: userLToken,
    };
    console.log(selected);
    await addToCart(cartData);
    handleRemoveWishlist(wishlistItem.uuid);
    ToastAndroid.show('Product added to cart', ToastAndroid.SHORT);
    // refetch();
    closeModal();
  };

  const handleRemoveWishlist = async id => {
    const remove = {
      id: id,
      token: userLToken,
    };
    await removeProduct(remove);
    closeModal();
    refetch();
  };

  const totalValue = item => {
    return item.price - (item.price * item.discount) / 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={productList}
        keyExtractor={(item, index) => item.tc_id}
        renderItem={({item, index}) => {
          return (
            <>
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductDescription', {
                    productid: item.uuid,
                  })
                }
                style={styles.mainContainer}>
                <View>
                  <Image style={styles.image} source={{uri: item.image}} />
                </View>
                <View style={styles.details}>
                  <Text style={styles.title}>{item.name}</Text>
                  <View style={[styles.priceFlex]}>
                    <Text style={styles.mrp}>MRP</Text>
                    <Text style={styles.price}>₹{totalValue(item)}</Text>
                    <Text style={styles.priceOverline}>
                      ₹{parseFloat(item.price).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={styles.cartBtn}
                  onPress={() => handleDelete(item)}>
                  <Icon name="delete" style={styles.cartBtnText} />
                </Pressable>
              </Pressable>
              <Modal
                visible={isModalVisible}
                transparent
                animationType="slide"
                statusBarTranslucent={true}>
                <Pressable style={styles.modalBackground} onPress={closeModal}>
                  <View
                    {...panResponder.panHandlers}
                    style={styles.modalContainer}>
                    <View style={styles.dragBar} />
                    <View style={styles.modal}>
                      <View style={styles.gap}>
                        <Text style={styles.removeHeading}>
                          Are You Sure you want to Remove
                          <Text style={styles.productModalText}>
                            {selected?.name}
                          </Text>
                          from wishlist?
                        </Text>

                        <View style={styles.rowContainer}>
                          <Pressable
                            onPress={() => handleRemoveWishlist(selected.uuid)}
                            style={[styles.btn, styles.modalRemoveBtn]}>
                            <Text
                              style={[
                                styles.btnText,
                                styles.modalRemoveBtnText,
                              ]}>
                              Remove
                            </Text>
                          </Pressable>
                          <Pressable
                            onPress={() => addToCartHandler(selected)}
                            style={[styles.btn, styles.modalSaveBtn]}>
                            <Text
                              style={[styles.btnText, styles.modalSaveBtnText]}>
                              Add to cart
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlWhite,
    padding: adjust(10),
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
    // width: '100%',
    backgroundColor: colors.red,
    padding: adjust(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: adjust(50),
    position: 'absolute',
    // bottom: adjust(-25),
    top: 0,
    right: 0,
  },
  cartBtnText: {
    color: colors.pearlWhite,
    fontWeight: '500',
    fontSize: adjust(15),
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
    width: '45%',
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
});
