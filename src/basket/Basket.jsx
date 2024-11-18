import { useState } from "react";
import FreeDelivery from "../assets/freegot.png";
import styles from "../app.module.scss";
import {
  removeProductItemFromBasket,
  editProductItemBasket,
} from "../services/FB";
import Modal from "../modal/OrderModal";

function Basket({ cartItems, setCartItems }) {
  const initialWindowWidth =
    typeof window !== "undefined" ? window.innerWidth : 1024;
  const [windowWidth] = useState(initialWindowWidth);
  const [showItems, setShowItems] = useState(initialWindowWidth > 1005);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeBasket = (e) => {
    e.stopPropagation();
    setShowItems(false);
  };

  const toggleItems = (e) => {
    e.stopPropagation();
    setShowItems((prev) => !prev);
  };

  const updateItemCount = async (id, delta) => {
    setCartItems((prevItems) => {
      const newItems = prevItems
        .map((item) => {
          if (item.id === id) {
            const newCount = item.count + delta;
            return { ...item, count: Math.max(newCount, 0) };
          }
          return item;
        })
        .filter((item) => item.count > 0);

      return newItems;
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

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.price * item.count, 0)
    : 0;

  const itemCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.count, 0)
    : 0;

  const maxImages = {
    burgers: 6,
    snacks: 5,
    "hot-dogs": 5,
    pizza: 5,
    shawerma: 5,
    wok: 5,
    combo: 5,
    desserts: 5,
    sauce: 5,
  };

  const renderBasketItems = () => {
    if (itemCount === 0) {
      return (
        <div>
          <h2>Тут пока пусто :(</h2>
        </div>
      );
    }

    let containerClass = showItems
      ? styles.itemsContainerOpen
      : styles.itemsContainer;

    return (
      <div className={containerClass} onClick={(e) => e.stopPropagation()}>
        {cartItems.map((item, productIndex) => {
          const index = productIndex % maxImages[item.name_product];
          const imagePath = `/products/${item.name_product}/${item.name_product}_${index}.png`;
          return (
            <div key={`${item.id}-${item.count}`}>
              <div className={styles.wrapperBuy}>
                <div className={styles.infoCheese}>
                  <img src={imagePath} alt={item.name} />
                  <div className={styles.desc}>
                    <h2>{item.name}</h2>
                    <p>{item.weight}</p>
                    <h2>{item.price}₽</h2>
                  </div>
                </div>
                <div className={styles.countCheese}>
                  <button onClick={() => updateItemCount(item.id, -1)}>
                    -
                  </button>
                  <span>{item.count}</span>
                  <button onClick={() => updateItemCount(item.id, 1)}>+</button>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.background} onClick={closeBasket}>
      <div className={styles.wrapperBasket} onClick={toggleItems}>
        <div className={styles.wrapperItems}>
          <h1>Корзина</h1>
          <span>{itemCount}</span>
        </div>

        {windowWidth > 1005 && <hr />}
        {renderBasketItems()}

        {itemCount > 0 && showItems && (
          <div>
            <div className={styles.sumWrap}>
              <h3>Итого</h3>
              <p>{totalPrice}₽</p>
            </div>
            <div className={styles.getcall}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                Оформить заказ
              </button>
            </div>
            {totalPrice > 1000 && (
              <div className={styles.freeget}>
                <img src={FreeDelivery} alt="free_delivery" />
                <p>Бесплатная доставка</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        itemCount={itemCount}
      />
    </div>
  );
}

export default Basket;
