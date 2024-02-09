import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Custominput from '../Custominput';
import {colors} from '../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddressModal = () => {
  const inputFields = [
    {
      id: 1,
      label: 'Name',
      name: 'name',
      placeholder: 'Enter Name',
    },
    {
      id: 2,
      label: 'Phone Number',
      name: 'phoneNumber',
      placeholder: 'Enter your phone number',
    },
    {
      id: 3,
      label: 'House No/ Apartment No',
      name: 'houseNumber',
      placeholder: 'Enter your house number',
    },
    {
      id: 4,
      label: 'Street',
      name: 'street',
      placeholder: 'Enter your street',
    },
    {
      id: 5,
      label: 'City',
      name: 'city',
      placeholder: 'Enter your city',
    },
    {
      id: 6,
      label: 'State',
      name: 'state',
      placeholder: 'Enter your state',
    },
    {
      id: 7,
      label: 'Pin Code',
      name: 'postalCode',
      placeholder: 'Enter your pincode',
    },
  ];

  const placeOptions = [
    {
      id: 1,
      name: 'Home',
      value: 'Home',
      icon: 'home',
    },
    {
      id: 2,
      name: 'Work',
      value: 'Work',
      icon: 'building',
    },
    {
      id: 3,
      name: 'Other',
      value: 'Other',
      icon: 'user',
    },
  ];

  return (
    <Formik
      initialValues={{
        name: '',
        phoneNumber: '',
        houseNumber: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().max(20, 'Invalid name').required('Required'),
        houseNumber: Yup.string()
          .max(20, 'Invalid last name')
          .required('Required'),
        street: Yup.string().max(20, 'Invalid last name').required('Required'),
        state: Yup.string().max(20, 'Invalid last name').required('Required'),
        phoneNumber: Yup.string()
          .max(20, 'Invalid phone number')
          .required('Required'),
        city: Yup.string().max(20, 'Invalid city').required('Required'),
        postalCode: Yup.string().max(6, 'Invalid city').required('Required'),
      })}
      onSubmit={values => console.log(values)}>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <>
          <View style={[styles.row, styles.mb]}>
            {placeOptions.map(place => (
              <Pressable key={place.id} style={styles.placeButton}>
                <FontAwesome
                  name={place.icon}
                  size={18}
                  color={colors.neutralBlack}
                />
                <Text style={styles.placeText}>{place.name}</Text>
              </Pressable>
            ))}
          </View>
          {inputFields.map(field => (
            <View key={field.id} style={styles.maxWidth}>
              <Custominput
                label={field.label}
                name={field.name}
                placeholder={field.placeholder}
                onChangeText={handleChange(field.name)}
                onBlur={handleBlur(field.name)}
                value={values[field.name]}
              />
              {touched[field.name] && errors[field.name] ? (
                <Text style={styles.errorText}>{errors[field.name]}</Text>
              ) : null}
            </View>
          ))}
          <View style={styles.row}>
            <Pressable
              disabled={
                errors.name ||
                errors.houseNumber ||
                errors.street ||
                errors.phoneNumber ||
                errors.city ||
                errors.state ||
                errors.postalCode
                  ? true
                  : false
              }
              onPress={handleSubmit}
              title="Submit"
              style={styles.submitButton}>
              <Text style={styles.addText}>Add</Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              title="Submit"
              style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </>
      )}
    </Formik>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  mb: {
    marginBottom: '2%',
  },
  modal: {
    // Your modal styles
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  maxWidth: {
    width: '100%',
    marginBottom: '3%',
    height: 75,
  },
  submitButton: {
    width: '49%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    backgroundColor: 'purple',
    borderRadius: 5,
    marginTop: '2%',
  },
  addText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    width: '49%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    borderRadius: 5,
    marginTop: '2%',
    borderWidth: 1,
    borderColor: 'purple',
  },
  cancelText: {
    fontSize: 15,
    color: 'purple',
    fontWeight: '500',
  },
  placeButton: {
    width: '32%',
    backgroundColor: colors.gray_400,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  placeText: {
    color: colors.neutralBlack,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 6,
  },
});
