import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {Header as HeaderRNE, HeaderProps, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Header = () => {
  return (
    <SafeAreaProvider>
      <HeaderRNE
        leftComponent={{text: 'PillBox Logo', style: styles.heading}}
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Icon type="antdesign" name="shoppingcart" color="white" />
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaProvider>
  );
};

export default Header;

const styles = StyleSheet.create({});
