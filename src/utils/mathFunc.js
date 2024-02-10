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
