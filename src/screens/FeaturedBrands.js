import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useGetBrandsQuery} from '../services/userAuthApi';
const screenwidth = Dimensions.get('window').width; //full width;
const screenheight = Dimensions.get('window').height; //full height;

const FeaturedBrands = () => {
  const navigation = useNavigation();
  const {data, isLoading, isFetching, error, isSuccess} = useGetBrandsQuery();

  const categorylist = [];

  {
    isSuccess &&
      data.data.map(brand => {
        const name = brand.name;
        const uuid = brand.uuid;
        const image = brand.image;
        categorylist.unshift({name: name, image: image, uuid: uuid});
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>Featured Brands</Text>

      <View
        style={{
          marginTop: 20,
        }}>
        <ScrollView horizontal>
          {categorylist.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('FeaturedBrandItems', {id: item.uuid})
              }
              key={item.uuid}>
              <View style={styles.catLayout} key={item.uuid}>
                <View style={styles.imageLayout}>
                  <View style={styles.buttonContainer}>
                    <Image source={{uri: item.image}} style={styles.image} />
                  </View>
                </View>
                <Text style={styles.productname}>
                  {item.name != null ? item.name : ''}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FeaturedBrands;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
  },
  catLayout: {
    width: 100,
    height: 130,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  imageLayout: {
    width: 80,
    height: 80,
  },
  productname: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    margin: 2,
  },
  categoryText: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 20,
    color: '#000',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    zIndex: 1111,
    width: 200,
  },
});
