import {StyleSheet, View, TextInput, Pressable} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import adjust from '../utils/responsive';
import {colors} from '../constants/colors';

const Search = props => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(props.navigate, {component: props.component})
      }>
      <View style={styles.box}>
        <Feather
          name="search"
          size={adjust(18)}
          color={colors.gray_600}
          style={{padding: adjust(5)}}
        />
        <TextInput
          placeholder={props.placeholder}
          editable={props.editable}
          numberOfLines={1}
          placeholderTextColor={colors.gray_600}
        />
      </View>
    </Pressable>
  );
};

export default Search;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    borderColor: colors.gray_400,
    backgroundColor: colors.pearlWhite,
    borderWidth: 1,
    borderRadius: adjust(5),
    // marginHorizontal: adjust(10),
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
});
