import {Pressable, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Custominput from '../Custominput';
import {colors} from '../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import uuid from 'react-native-uuid';
import {addUserAddress} from '../../services/profileService';

const AddressModal = ({
  data,
  method,
  additionalAddress,
  closeModal,
  token,
  refetch,
}) => {
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
      name: 'pinCode',
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

  const [selectedPlace, setSelectedPlace] = useState(() =>
    method === 'add'
      ? ''
      : method === 'edit'
      ? data.address.place
      : additionalAddress.place,
  );

  const submitFormData = async formData => {
    if (selectedPlace === '') {
      return ToastAndroid.show('Select Place', ToastAndroid.SHORT);
    }
    try {
      // Validate form data

      formData.place = selectedPlace;

      const response = await addUserAddress(
        data,
        method,
        formData,
        additionalAddress,
        token,
      );

      // If the response is successful, update the profile data and close the form
      if (response.status === 200 || response.status === 201) {
        refetch();
        closeModal();
        if (method === 'add') {
          ToastAndroid.show('Address added', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Address updated', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        id:
          method === 'add'
            ? uuid.v4()
            : method === 'edit'
            ? data.uuid
            : additionalAddress.id,
        // Set other default values based on the method
        name:
          method === 'add'
            ? ''
            : method === 'edit'
            ? data.address.name
            : additionalAddress.name,
        phoneNumber:
          method === 'add'
            ? ''
            : method === 'edit'
            ? data.address.phoneNumber
            : additionalAddress.phoneNumber,
        houseNumber:
          method === 'add'
            ? ''
            : method === 'edit'
            ? data.address.houseNumber
            : additionalAddress.houseNumber,
        street:
          method === 'add'
            ? ''
            : method === 'edit'
            ? data.address.street
            : additionalAddress.street,
        city:
          method === 'add'
            ? ''
            : method === 'edit'
            ? data.address.city
            : additionalAddress.city,
        state:
          method === 'add'
            ? ''
            : method === 'edit'
            ? data.address.state
            : additionalAddress.state,
        pinCode:
          method === 'add'
            ? ''
            : method === 'edit'
            ? data.address.pinCode
            : additionalAddress.pinCode,
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
        pinCode: Yup.string().max(6, 'Invalid city').required('Required'),
      })}
      onSubmit={values => submitFormData(values)}>
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
              <Pressable
                key={place.id}
                style={
                  selectedPlace === place.name
                    ? styles.selectedPlaceButton
                    : styles.placeButton
                }
                onPress={() => setSelectedPlace(place.name)}>
                <FontAwesome
                  name={place.icon}
                  size={18}
                  color={
                    selectedPlace === place.name
                      ? colors.white
                      : colors.neutralBlack
                  }
                />
                <Text
                  style={
                    selectedPlace === place.name
                      ? styles.selectedPlaceText
                      : styles.placeText
                  }>
                  {place.name}
                </Text>
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
                errors.pinCode
                  ? true
                  : false
              }
              onPress={handleSubmit}
              title="Submit"
              style={styles.submitButton}>
              <Text style={styles.addText}>
                {method === 'add' ? 'Add' : 'Save'}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => closeModal()}
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
  selectedPlaceButton: {
    width: '32%',
    backgroundColor: 'purple',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedPlaceText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 6,
  },
});
