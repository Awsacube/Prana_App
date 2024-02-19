import {ToastAndroid} from 'react-native';
import axios from 'axios';

export const placeHealthCareCartOrder = async (
  address,
  paymentMethod,
  cartData,
  token,
) => {
  try {
    if (!address) {
      return ToastAndroid.show('Select delivery address', ToastAndroid.SHORT);
    }
    if (!paymentMethod) {
      return ToastAndroid.show('Select payment method', ToastAndroid.SHORT);
    } else {
      const shippingAddress = address;
      const billingAddress = shippingAddress;

      // Check if the "bill" in localStorage contains a selectedCoupon
      // const billDetails = JSON.parse(localStorage.getItem('bill'));
      // const coupon_code = billDetails?.selectedCoupon?.code;

      const products = cartData.map(item => {
        return item.uuid;
      });

      const formData = new FormData();

      formData.append('product_ids', JSON.stringify(products));
      formData.append('shipping_address', shippingAddress);
      formData.append('billing_address', billingAddress);
      formData.append('payment_method', paymentMethod);
      // Append coupon_code to formData only if it's present in the billDetails
      // if (coupon_code) {
      //   formData.append('coupon_code', coupon_code);
      // }

      console.log(formData);

      const response = await axios.post(
        'https://api-prana.prana24.in/api/orders',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        },
      );

      if (response.status === 200) {
        return ToastAndroid.show('Order Placed', ToastAndroid.SHORT);
      }

      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
