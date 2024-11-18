import { updateCart, updateItemCart } from "../services/FB";

export function addItemBasket(item, basketItems, upload, urlImg) {
  const newItemCustom = { ...item, urlImg };
  let activeIndex;

  const validatedItem = basketItems.find((el, index) => {
    activeIndex = index;
    return el.id === newItemCustom.id;
  });

  if (!validatedItem) {
    updateCart(newItemCustom).then(() => {
      upload.setStatus((prev) => !prev);
    });
    return;
  }

  const newItem = { ...validatedItem, count: validatedItem.count + 1 };
  updateItemCart(newItem, upload.dataKeys[activeIndex]).then(() => {
    upload.setStatus((prev) => !prev);
  });
}
