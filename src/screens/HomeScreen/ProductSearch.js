import {useNavigation} from '@react-navigation/native';
import {skipToken} from '@reduxjs/toolkit/dist/query';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSearchProductsQuery} from '../../services/userAuthApi';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {setSearchResults} from '../../app/search-slice';

const ProductSearch = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
        const image = item.image;
        suggestion.push({name: name, uuid: uuid, image: image});
      });
  }

  useEffect(() => {
    console.log(data);
    dispatch(setSearchResults({result: suggestion}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestion]);

  return (
    <>
      <View style={styles.row}>
        <View>
          <TextInput
            placeholder={'Search Health Care Products'}
            onChangeText={text => handleChange(text)}
          />
        </View>
        <Feather name="search" size={30} color="#C6C6C6" />
      </View>
    </>
  );
};

export default ProductSearch;

const styles = StyleSheet.create({
  result: {
    color: '#000',
    padding: 20,
  },
  searchresult: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
});
