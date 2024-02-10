//Test And Packages Screen Can Be Used Interchangeably
import {StyleSheet, Text, View, FlatList, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import CButton from '../../components/CButton';
import {useNavigation} from '@react-navigation/native';
// import {brandColor} from '../../constants/constants';
import {getToken} from '../../services/AsyncStorageService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useGetAllTestsQuery,
  useAddToLabCartMutation,
} from '../../services/userAuthApi';
import adjust from '../../utils/responsive';
import {colors} from '../../constants/colors';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

// const allTests=[ {
//     "name": "Diabetes Care",
//     "price":235,
//     "description":"Diabetic care and etc etc etc etc etc etc",
//     "reportTime":"15 min",
//     "discount":"54%"
//   },
//   {
//     "name": "Diabetes Care",
//     "price":235,
//     "description":"Diabetic care and etc etc etc etc etc etc",
//     "reportTime":"15 min",
//     "discount":"54 %"
//   },
//   {
//     "name": "Diabetes Care",
//     "price":235,
//     "description":"Diabetic care and etc etc etc etc etc etc",
//     "reportTime":"15 min",
//   },
// ]

const AllTests = () => {
  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const navigation = useNavigation();
  const {data, isLoading, isFetching, error, isSuccess, refetch} =
    useGetAllTestsQuery();

  const allTests = [];

  {
    isSuccess &&
      data.data.forEach(element => {
        // console.warn(element)
        const uuid = element.uuid;
        const name = element.name;
        const image = element.image;
        const discount = element.discount;
        const price = element.price;
        const tat = element.report_tat;
        const tatUnit = element.report_tat_unit;
        const content = element.content;
        allTests.unshift({
          name: name,
          image: image,
          uuid: uuid,
          price: price,
          discount: discount,
          content: content,
          tat: tat,
          tatUnit: tatUnit,
        });
      });
  }

  const [addToCart] = useAddToLabCartMutation(); //send cart data to backend
  // const { refecth }=useGetAllCartItemsQuery();
  // const cartData={
  // id:productid,
  // // quantity:quantity,
  // token:userLToken}
  const addToCartHandler = async productid => {
    console.warn('productid', productid);
    const cartData = {
      id: productid,
      token: userLToken,
    };
    await addToCart(cartData);
    // refecth();
  };

  const totalValue = item => {
    return item.price - (item.price * item.discount) / 100;
  };

  return (
    <SafeAreaView>
      <View>
        {/* <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
        <Text style={{
          marginLeft: 15,
          fontSize: 18,
          color: '#000'
        }}>Tests</Text>
        <Text style={styles.vAll} onPress={()=>navigation.navigate('AllTests')}>View All</Text>
    </View> */}
        <FlatList
          data={allTests}
          keyExtractor={(item, index) => item.tc_id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Pressable
                style={styles.mainContainer}
                onPress={() =>
                  navigation.navigate('TestsAndPackagesById', {
                    id: item.uuid,
                    TestorPackname: item.name,
                  })
                }>
                <View>
                  <Image style={styles.image} source={{uri: item.image}} />
                </View>
                <View style={styles.details}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.contentText}>{item.content}</Text>
                  {/* <View>
                    <Text style={styles.priceOverline}>{item.description}</Text>
                    <Text style={styles.priceOverline}>
                      Report in {item.tat} {item.tatUnit}
                    </Text>
                  </View> */}
                  <View style={[styles.priceFlex]}>
                    <Text style={styles.mrp}>MRP</Text>
                    <Text style={styles.price}>₹{totalValue(item)}</Text>
                    <Text style={styles.priceOverline}>
                      ₹{parseFloat(item.price).toFixed(2)}
                    </Text>
                  </View>

                  <Pressable
                    style={styles.cartBtn}
                    // onPress={() => {
                    //   dispatch(handleCart(product.id, 1));
                    // }}>
                    onPress={() =>
                      addToCartHandler({
                        id: item.uuid,
                        quantity: 1,
                        token: userLToken,
                      })
                    }>
                    <Text style={styles.cartBtnText}>Add to cart</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllTests;

const styles = StyleSheet.create({
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
    marginHorizontal: adjust(5),
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
    marginBottom: adjust(2),
  },
  contentText: {
    fontSize: adjust(12),
    color: colors.gray_600,
    fontWeight: '500',
    textTransform: 'capitalize',
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
    width: '100%',
    backgroundColor: colors.azureBlue,
    paddingVertical: adjust(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: adjust(5),
    position: 'absolute',
    bottom: adjust(-25),
  },
  cartBtnText: {
    color: colors.pearlWhite,
    fontWeight: '500',
    fontSize: adjust(12),
  },
});
