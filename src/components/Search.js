import {StyleSheet, View, TextInput, Pressable} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Search = props => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(props.navigate, {component: props.component})
      }>
      <View
        style={{
          flexDirection: 'row',
          borderColor: '#C6C6C6',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 8,
          marginHorizontal: 13,
        }}>
        <Feather name="search" size={30} color="#E73631" style={{padding: 8}} />
        <TextInput
          placeholder={props.placeholder}
          editable={props.editable}
          numberOfLines={1}
          placeholderTextColor="#000"
        />
      </View>
    </Pressable>
  );
};

export default Search;

const styles = StyleSheet.create({});
