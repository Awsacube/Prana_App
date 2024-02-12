import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTestsAndPackagesByIdQuery} from '../../services/userAuthApi';
import CButton from '../../components/CButton';
import React from 'react';
import adjust from '../../utils/responsive';
import {colors} from '../../constants/colors';

const TestsAndPackagesById = ({route}) => {
  const {id, TestorPackname} = route.params;
  const {data, isLoading, isFetching, error, isSuccess, refetch} =
    useTestsAndPackagesByIdQuery(id);
  const SingleTestOrPackage = [];

  let uuid;
  let name;
  let image;
  let discount;
  let price;
  let tat;
  let tatUnit;
  let content;
  let description;
  let HomeSample;

  {
    isSuccess &&
      data.data?.forEach(element => {
        if (element.name === TestorPackname) {
          uuid = element.uuid;
          name = element.name;
          image = element.image;
          discount = element.discount;
          price = element.price;
          tat = element.report_tat;
          tatUnit = element.report_tat_unit;
          content = element.content;
          description = element.description;
          HomeSample = element.home_sample_charge;
          SingleTestOrPackage.unshift({
            name: name,
            image: image,
            uuid: uuid,
            price: price,
            discount: discount,
            content: content,
            tat: tat,
            tatUnit: tatUnit,
            description: description,
            HomeSample: HomeSample,
          });
        }
      });
  }

  const totalValue = item => {
    return price - (price * discount) / 100;
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{uri: image}} />
        <View style={styles.infoContainer}>
          <View style={styles.flexContainer}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={[styles.priceFlex]}>
            <Text style={styles.mrp}>MRP</Text>
            <Text style={styles.price}>₹{totalValue()}</Text>
            <Text style={styles.priceOverline}>
              ₹{parseFloat(price).toFixed(2)}
            </Text>
          </View>
          <View style={[styles.priceFlex]}>
            <Text style={styles.mrp}>Home Sample Charges</Text>
            <Text style={styles.price}>
              ₹{parseFloat(HomeSample).toFixed(2)}
            </Text>
          </View>
          <Text style={styles.description}>{content}</Text>
          <View style={styles.buttonsContainer}>
            {/* <Pressable
              style={styles.wishlistButton}
              onPress={() => addToWishlistHandler()}>
              <Text style={styles.wishlistText}>Add to wishlist</Text>
            </Pressable> */}
            <Pressable style={styles.button} onPress={() => console.log(data)}>
              <Text style={styles.buttonText}>Add to cart</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestsAndPackagesById;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignContent: 'center',
    backgroundColor: colors.pearlWhite,
  },
  image: {
    height: adjust(250),
    width: '100%',
  },
  infoContainer: {
    // padding: 16,
    paddingVertical: adjust(3),
    paddingHorizontal: adjust(10),
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: adjust(14),
    fontWeight: '500',
    color: colors.neutralBlack,
    textTransform: 'capitalize',
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
  priceFlex: {
    flexDirection: 'row',
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
  description: {
    fontSize: adjust(11),
    fontWeight: '400',
    color: colors.neutralBlack,
    marginBottom: adjust(10),
  },
  button: {
    marginVertical: adjust(5),
    paddingVertical: adjust(5),
    borderRadius: adjust(5),
    textAlign: 'center',
    backgroundColor: colors.azureBlue,
    borderWidth: 1,
    borderColor: colors.azureBlue,
  },
  buttonText: {
    color: colors.pearlWhite,
    fontSize: adjust(12),
    fontWeight: '500',
    textAlign: 'center',
  },
  wishlistButton: {
    marginVertical: adjust(5),
    paddingVertical: adjust(5),
    borderRadius: adjust(5),
    textAlign: 'center',
    backgroundColor: colors.pearlWhite,
    borderWidth: 1,
    borderColor: colors.azureBlue,
  },
  wishlistText: {
    color: colors.azureBlue,
    fontSize: adjust(14),
    fontWeight: '500',
    textAlign: 'center',
  },
});
