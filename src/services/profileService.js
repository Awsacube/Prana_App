import axios from 'axios';
import {ToastAndroid} from 'react-native';

export const addUserAddress = async (
  data,
  method,
  formData,
  additionalAddressData,
  token,
) => {
  let response;
  // Perform actions based on the method (add, edit)
  if (method === 'add') {
    if (!data || !data.address) {
      // If user has no address, patch profile with the new address
      response = await axios.patch(
        'https://api-prana.prana24.in/api/users/profile',
        {
          address: formData,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
    } else {
      // If user has an address, add the new address to additional addresses
      response = await axios.patch(
        'https://api-prana.prana24.in/api/users/profile',
        {
          additional_address: [...(data.additional_address || []), formData],
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
    }
    if (response) {
      ToastAndroid.show('Added', ToastAndroid.SHORT);
    }
  } else if (method === 'edit') {
    // Edit the existing address in the profile
    response = await axios.patch(
      'https://api-prana.prana24.in/api/users/profile',
      {
        address: formData,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    if (response) {
      ToastAndroid.show('Updated', ToastAndroid.SHORT);
    }
  } else {
    // Edit a specific additional address
    const index =
      data?.additional_address &&
      data.additional_address.findIndex(
        address => address.id === additionalAddressData.id,
      );

    if (index !== -1) {
      const updatedAddress = [...(data.additional_address || [])];
      updatedAddress[index] = {...updatedAddress[index], ...formData};
      response = await axios.patch(
        'https://api-prana.prana24.in/api/users/profile',
        {
          additional_address: updatedAddress,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response) {
        ToastAndroid.show('Updated', ToastAndroid.SHORT);
      }
    }
  }

  return response;
};

export const handleDeleteUserAddress = async (token, refetch) => {
  const response = await axios.patch(
    'https://api-prana.prana24.in/api/users/profile',
    {
      address: {},
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );

  if (response.status === 200 || response.status === 201) {
    refetch();
  }
  return response.data;
};

export const handleDeleteUserAdditionalAddress = async (
  addressData,
  addressId,
  token,
  refetch,
) => {
  if (addressData?.additional_address) {
    const index = addressData.additional_address.findIndex(
      address => address.id === addressId,
    );
    if (index !== -1) {
      const newAdditionalAddress = [...addressData.additional_address].filter(
        address => address.id !== addressId,
      );
      const response = await axios.patch(
        'https://api-prana.prana24.in/api/users/profile',
        {
          additional_address: newAdditionalAddress,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status === 200 || response.status === 201) {
        refetch();
      }
      return response.data;
    }
  }
};
