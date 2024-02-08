import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const EmptyPage = ({navigation, route}) => {
  const {component} = route.params;

  const searchResult = useSelector(state => state.search.searchResult);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => component,
    });
  });

  return (
    <SafeAreaView style={styles.back}>
      {searchResult.search?.length > 0 &&
        searchResult.search?.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate('ProductDescription', {
                productid: item.uuid,
              })
            }>
            <View style={[styles.row, styles.gap]}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.title}>{item.name}</Text>
            </View>
          </Pressable>
        ))}
    </SafeAreaView>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#ffffff',
    height: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  searchResult: {
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  result: {
    fontSize: 16,
  },
  gap: {
    gap: 8,
  },
  image: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
