import React from 'react';
import {View, TextInput, StyleSheet, Pressable, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Custominput = ({
  label,
  name,
  placeholder,
  isSecure,
  secureText,
  setSecureText,
  onChangeText,
  onBlur,
  value,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        name={name}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'black'}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureText}
      />
      <View style={styles.iconContainer}>
        {isSecure &&
          (secureText ? (
            <Pressable onPress={() => setSecureText(false)}>
              <Entypo name="eye" size={20} />
            </Pressable>
          ) : (
            <Pressable onPress={() => setSecureText(!secureText)}>
              <Entypo name="eye-with-line" size={20} />
            </Pressable>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    position: 'relative',
    display: 'flex',
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    right: 10,
    // width: '25%',
    paddingHorizontal: '1%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginBottom: 2,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  icon: {
    position: 'absolute',
    right: 20,
    bottom: 12,
    color: 'black',
  },
});

export default Custominput;
