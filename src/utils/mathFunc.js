export const totalValue = item => {
  return item.item.price - (item.item.price * item.item.discount) / 100;
};

// Calculate subTotal based on items in the cart

export const subTotal = data => {
  const value = data?.reduce((sum, product) => {
    return sum + product.product.price * product.quantity;
  }, 0);

  return value;
};

export const deliveryCharges = data => {
  const value = data?.reduce((sum, product) => {
    return (subTotal(data) - totalDiscount(data)) * 0.1;
  }, 0);

  return value;
};

// {Math.ceil((subTotal - discount - couponValue) * 0.1).toFixed(2)}

export const totalDiscount = data => {
  const value = data?.reduce((sum, product) => {
    return (
      sum +
      parseFloat(
        product.product.price *
          (product.product.discount / 100) *
          product.quantity,
      )
    );
  }, 0);
  return value;
};

//LAB BILL

// Calculate subTotal based on items in the Lab cart

export const labSubTotal = data => {
  const value = data?.reduce((sum, product) => {
    return sum + product.lab_test.price * product.quantity;
  }, 0);

  return value;
};

export const sampleCollectionCharges = data => {
  const value = data?.reduce((sum, product) => {
    return sum + parseFloat(product.lab_test.home_sample_charge);
  }, 0);

  return value;
};

export const labTotalDiscount = data => {
  const value = data?.reduce((sum, product) => {
    return (
      sum +
      parseFloat(
        product.lab_test.price *
          (product.lab_test.discount / 100) *
          product.quantity,
      )
    );
  }, 0);
  return value;
};

export const labDiscount = data => {
  const value = data?.reduce((sum, product) => {
    return sum + parseFloat(product.lab_test.discount);
  }, 0);
  return value;
};
