import {StyleSheet, Text, View, Image, FlatList, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useGetproductsbyfilteridQuery} from '../services/userAuthApi';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getToken} from '../services/AsyncStorageService';

export default function ProductItem({route}) {
  const navigation = useNavigation();

  const productList = [];

  const {id} = route.params;

  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    const getT = async () => {
      const token = await getToken(); //getting token from storage
      setUserLToken(token); //store token in local storage
    };
    getT();
  }, []);

  const queryItems = {token: userLToken, id: id};

  const res = useGetproductsbyfilteridQuery(queryItems, {
    refetchOnMountOrArgChange: true,
  });

  console.warn(res);

  if (res.isSuccess === true) {
    const data = res.data.products;
    data.forEach(element => {
      const name = element.name;
      const image = element.image;
      const price = element.price;
      const uuid = element.uuid;
      const description = element.description;
      productList.unshift({
        name: name,
        image: image,
        uuid: uuid,
        price: price,
        description: description,
      });
    });
  }

  return (
    <FlatList
      data={productList}
      numColumns={2}
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
              style={styles.root}
            >
              <View>
                <View>
                  <Image style={styles.image} source={{uri: item.image}} />
                </View>
                <View style={styles.rightCom}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>MRP:{item.price}</Text>
                  <Text>{item.description}</Text>
                </View>
              </View>
            </Pressable>
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
  rightCom: {},
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  title: {},
  price: {},
});
