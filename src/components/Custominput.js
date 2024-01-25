import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const Custominput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    color: 'black',
  },
});

export default Custominput;
