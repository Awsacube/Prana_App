import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants/colors';
import RadioButton from 'react-native-radio-buttons-group';
import adjust from '../utils/responsive';

const PaymentType = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);

  const radioButtons = useMemo(() => {
    const properties = {
      labelStyle: {
        color: colors.neutralBlack,
        fontSize: adjust(15),
      },
      size: adjust(20),
      containerStyle: {
        gap: adjust(12),
        alignItems: 'center',
      },
    };

    return [
      {
        id: 0,
        label: 'COD',
        value: 'COD',
        ...properties,
      },
      {
        id: 1,
        label: 'Online',
        value: 'Online',
        ...properties,
      },
    ];
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cancelContainer}>
        <Pressable onPress={() => navigation.navigate('CartContainer')}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </Pressable>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Select Payment Method</Text>
        <RadioButton
          radioButtons={radioButtons}
          onPress={setSelected}
          selectedId={selected}
          containerStyle={styles.flexStart}
          color="#644"
          borderColor={colors.red}
        />
      </View>
      <Pressable
        onPress={() => navigation.navigate('Checkout')}
        // onPress={() => console.log(value, buttonData)}
        style={styles.deliverButton}>
        <Text style={styles.deliverButtonText}>Deliver to this address</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PaymentType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlWhite,
    position: 'relative',
  },
  mainContainer: {
    marginHorizontal: adjust(10),
    marginVertical: adjust(5),
  },
  heading: {
    fontSize: adjust(16),
    color: colors.neutralBlack,
    fontWeight: '500',
    marginBottom: adjust(10),
  },
  flexStart: {
    alignItems: 'flex-start',
    // fontSize: adjust(14),
    // fontWeight: '400',
    // color: colors.red,
  },
  cancelContainer: {
    width: '100%',
    backgroundColor: colors.azureBlue,
    padding: 14,
  },
  cancelText: {
    marginLeft: 'auto',
    color: colors.white,
    fontWeight: '700',
  },
  deliverButton: {
    width: '100%',
    backgroundColor: colors.azureBlue,
    padding: adjust(10),
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  deliverButtonText: {
    color: colors.pearlWhite,
    fontSize: 15,
  },
});
