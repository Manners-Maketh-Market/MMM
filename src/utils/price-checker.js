const PriceChecker = (price) => {
  // 최고 시세
  const maxARR =
    price &&
    price.products.product.reduce((prev, value) => {
      return prev.price >= value.price ? prev : value;
    });

  // 최저 시세
  const minARR =
    price &&
    price.products.product.reduce((prev, value) => {
      return prev.price >= value.price ? value : prev;
    });

  // 평균 시세
  const result =
    price &&
    price.products.product.reduce((prev, value) => {
      return prev + value.price;
    }, 0);

  return { maxARR, minARR, result };
};

export default PriceChecker;
