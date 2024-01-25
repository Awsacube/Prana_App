import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const EmptyPage = ({navigation, route}) => {
  const {component} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => component,
    });
  });

  return (
    <SafeAreaView>
      <View style={styles.back}></View>
    </SafeAreaView>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#ffffff',
  },
});
