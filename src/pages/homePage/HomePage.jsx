import React, { useState, useEffect } from "react";
import Basket from "../../basket/Basket";
import styles from "./main.module.scss";
import Nav from "../../nav/Nav";
import chooseData from "../../nav/choose.json";
import {
  getData,
  editProductItemBasket,
  removeProductItemFromBasket,
  addCart,
} from "../../services/FB";
import OrderModal from "../../modal/OrderModal";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState("burgers");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const productsServer = getData(productType);
    const basketServer = getData("cart");

    Promise.allSettled([productsServer, basketServer]).then((results) => {
      if (results[0].status === "fulfilled") {
        setProducts({ data: results[0].value || [], status: true });
      }
      if (results[1].status === "fulfilled") {
        setCartItems(results[1].value ? Object.values(results[1].value) : []);
      }
      setLoading(false);
    });
  }, [productType]);

  const addToCart = async (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItem = { ...existingItem, count: existingItem.count + 1 };
      await editProductItemBasket(updatedItem, existingItem.id);
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === product.id ? updatedItem : item))
      );
    } else {
      const newItem = { ...product, count: 1 };
      await addCart(newItem);
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const updateCartItemCount = async (id, delta) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => {
          if (item.id === id) {
            const newCount = item.count + delta;
            return { ...item, count: Math.max(newCount, 0) };
          }
          return item;
        })
        .filter((item) => item.count > 0);

      return updatedItems;
    });

    const itemToUpdate = cartItems.find((item) => item.id === id);
    if (itemToUpdate) {
      const newCount = itemToUpdate.count + delta;
      if (newCount > 0) {
        await editProductItemBasket({ ...itemToUpdate, count: newCount }, id);
      } else {
        await removeProductItemFromBasket(id);
      }
    }
  };

  return (
    <>
      <Nav setProductType={setProductType} productType={productType} />
      <main className={styles.main}>
        <div className={styles.wrapperBasket}>
          <Basket
            cartItems={cartItems}
            setCartItems={setCartItems}
            updateCartItemCount={updateCartItemCount}
            onOrderClick={() => setIsOrderModalOpen(true)}
          />
        </div>
        <div className={styles.wrapperChoose}>
          <h1>
            {chooseData.find((item) => item.name_product === productType)
              ?.label || "Продукты"}
          </h1>
          <div className={styles.wrapperCardItem}>
            {products.data &&
              products.data.map((product, index) => (
                <div className={styles.cardItem} key={`${product.id}-${index}`}>
                  <img
                    src={`/products/${product.name_product}/${product.name_product}_${index}.png`}
                    alt={product.name}
                  />
                  <h2>
                    {!isNaN(product.price) ? product.price : "Цена не указана"}₽
                  </h2>
                  <p>{product.name}</p>
                  <span>{product.weight}</span>
                  <button onClick={() => addToCart(product)}>Добавить</button>
                </div>
              ))}
          </div>
        </div>
      </main>
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
}
