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

const Preloader = () => (
  <div className={styles.preloader}>
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className={styles.preloaderItem} />
    ))}
  </div>
);

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [keyCards, setkeyCards] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [updServer, setupdServer] = useState(false);
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
        setkeyCards(results[1].value ? Object.keys(results[1].value) : []);
      }
      setLoading(false);
    });
  }, [productType, updServer]);

  const addToCart = async (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedItem = { ...existingItem, count: existingItem.count + 1 };
      await editProductItemBasket(
        updatedItem,
        keyCards[cartItems.indexOf(existingItem)]
      );
      setupdServer(!updServer);
    } else {
      const newItem = { ...product, count: 1 };
      const newKey = await addCart(newItem);
      setkeyCards((prevKeys) => [...prevKeys, newKey.key]);
      setupdServer(!updServer);
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
        await editProductItemBasket(
          { ...itemToUpdate, count: newCount },
          keyCards[cartItems.indexOf(itemToUpdate)]
        );
      } else {
        await removeProductItemFromBasket(
          keyCards[cartItems.indexOf(itemToUpdate)]
        );
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
            {loading ? (
              <Preloader />
            ) : (
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
              ))
            )}
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
