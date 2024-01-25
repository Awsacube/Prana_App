import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetBrandItemQuery} from '../services/userAuthApi';
const screenwidth = Dimensions.get('window').width; //full width
const screenheight = Dimensions.get('window').height; //full height

const FeaturedBrandItems = ({route}) => {
  const {id} = route.params;
  const queryItems = {
    id: id,
  };
  const {data, isLoading, isFetching, error, isSuccess, isError} =
    useGetBrandItemQuery(queryItems);
  isError && console.log('err', error);
  const navigation = useNavigation();
  const brandItemsList = [];

  isSuccess && brandItemsList.push(data.items);
  isSuccess && console.log('success', brandItemsList[0]);

  return (
    <FlatList
      data={brandItemsList[0]}
      keyExtractor={(item, index) => item.id}
      renderItem={({item, index}) => {
        return (
          <SafeAreaView>
            <View style={styles.container}>
              <View>
                <Image style={styles.image} source={{uri: item.image}} />
              </View>
              <View>
                <Text style={{marginBottom: 10}}>{item.name}</Text>
                <Text style={{marginBottom: 10}}>INR: {item.price}</Text>
              </View>
              <View></View>
              {/* </Card> */}
            </View>
          </SafeAreaView>
        );
      }}
    />
  );
};

export default FeaturedBrandItems;

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    flexDirection: 'row',
  },
  Card: {},
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});
