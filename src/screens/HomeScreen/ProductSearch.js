import {useNavigation} from '@react-navigation/native';
import {skipToken} from '@reduxjs/toolkit/dist/query';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSearchProductsQuery} from '../../services/userAuthApi';
import Feather from 'react-native-vector-icons/Feather';

const ProductSearch = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState(skipToken);
  const handleChange = text => {
    if (text.length > 0) {
      setSearchQuery(text);
    } else {
      setSearchQuery(skipToken);
    }
  };

  const {data, isSuccess, isError} = useSearchProductsQuery(searchQuery);

  const suggestion = [];

  {
    isSuccess && console.warn('data', data.data);
  }

  {
    isSuccess &&
      data.data.forEach(item => {
        const name = item.name;
        const uuid = item.uuid;
        suggestion.push({name: name, uuid: uuid});
      });
  }

  return (
    <View>
      <View>
        <TextInput
          placeholder={'Search Health Care Products'}
          onChangeText={text => handleChange(text)}
        />

        {isSuccess &&
          suggestion.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate('ProductDescription', {
                  productid: item.uuid,
                })
              }>
              <View style={styles.searchresult}>
                <Text key={item.uuid} style={styles.result}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          ))}
      </View>

      <Feather name="search" size={40} color="#C6C6C6" />
    </View>
  );
};

export default ProductSearch;

const styles = StyleSheet.create({
  result: {
    color: '#000',
    padding: 20,
  },
  searchresult: {},
});
