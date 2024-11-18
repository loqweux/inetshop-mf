export function allItemsNum(price = false, basketItems) {
  let allCount = 0;
  let allPrice = 0;

  basketItems.forEach((item) => {
    allCount += item.count;
    allPrice += item.price * item.count;
  });

  return price ? allPrice : allCount;
}
