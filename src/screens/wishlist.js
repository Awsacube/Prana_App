import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  PanResponder,
  Modal,
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
      //   const description=element.description;
      productList.unshift({name: name, image: image, uuid: uuid, price: price});
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

  const handleDelete = id => {
    setSelected(id);
    openModal();
  };

  const [removeProduct] = useDeleteWishlistItemsMutation();
  const {refetch} = useWishListQuery(queryItems);
  const [addToCart] = useAddToCartMutation(); //send cart data to backend
  const cartData = {
    id: selected,
    quantity: 1,
    token: userLToken,
  };
  const handleCart = async id => {
    console.log(cartData);
    // await addToCart(cartData);
    refetch();
    closeModal();
  };

  const handleRemoveWishlist = async id => {
    const remove = {
      id: id,
      token: userLToken,
    };
    await removeProduct(remove);
    console.log('removed');
    closeModal();
    refetch();
  };

  return (
    <FlatList
      data={productList}
      keyExtractor={(item, index) => item.tc_id}
      renderItem={({item, index}) => {
        return (
          <SafeAreaView>
            <Pressable
              onPress={() =>
                navigation.navigate('ProductDescription', {
                  productid: item.uuid,
                })
              }
              style={styles.root}>
              <View style={styles.container}>
                <View>
                  <Image style={styles.image} source={{uri: item.image}} />
                </View>
                <View style={styles.rightCom}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>MRP:{item.price}</Text>
                  <Text>{item.description}</Text>
                </View>
                <Pressable
                  styles={styles.iconDesign}
                  onPress={() => handleDelete(item.uuid)}>
                  <Icon name="delete" size={40} color="#E73631" />
                </Pressable>
              </View>
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
                        Remove from cart?
                      </Text>
                      <Text style={styles.productModalText}>
                        {/* {selected.product.name} */}
                        sanju
                      </Text>
                      <View style={styles.rowContainer}>
                        <Pressable
                          onPress={() => handleRemoveWishlist(selected)}
                          style={[styles.btn, styles.modalRemoveBtn]}>
                          <Text
                            style={[styles.btnText, styles.modalRemoveBtnText]}>
                            Remove
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => handleCart(selected)}
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
          </SafeAreaView>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    // margin: 10,
    // borderWidth:1,
    // borderColor:'#d1d1d1',
    // borderRadius:10,
    // backgroundColor:'#fff',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rightCom: {},
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  title: {},
  price: {},
  iconDesign: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#D6DBDF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 15,
    height: '20%', //  as needed
  },
  modal: {
    height: '100%',
    paddingVertical: 10,
  },
  dragBar: {
    width: 40,
    height: 5,
    backgroundColor: 'gray',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  productModalText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginVertical: 2,
  },
  removeHeading: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 2,
  },
  // gap: {
  //   gap: 5,
  // },
  btn: {
    marginTop: 10,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalRemoveBtn: {
    backgroundColor: '#E73639',
  },
  modalSaveBtn: {
    backgroundColor: '#E73639',
  },
  modalRemoveBtnText: {
    color: '#fff',
  },
  modalSaveBtnText: {
    color: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
