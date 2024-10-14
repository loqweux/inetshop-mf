import { useState } from "react";
import FreeDelivery from "../assets/freegot.png";
import styles from "../app.module.scss";
import data from "./basket.json";

function Basket() {
  let initialWindowWidth;
  if (typeof window !== "undefined") {
    initialWindowWidth = window.innerWidth;
  } else {
    initialWindowWidth = 1024;
  }

  const [windowWidth] = useState(initialWindowWidth);
  const [cheeseCount, setCheeseCount] = useState(1);
  const [freeCount, setFreeCount] = useState(2);
  const [hotdogCount, setHotdogCount] = useState(1);
  const [showItems, setShowItems] = useState(initialWindowWidth > 1005);

  const toggleItems = () => setShowItems((prev) => !prev);

  const increaseCheese = (e) => {
    e.stopPropagation();
    setCheeseCount(cheeseCount + 1);
  };

  const decreaseCheese = (e) => {
    e.stopPropagation();
    if (cheeseCount > 0) {
      setCheeseCount(cheeseCount - 1);
    }
  };

  const increaseFree = (e) => {
    e.stopPropagation();
    setFreeCount(freeCount + 1);
  };

  const decreaseFree = (e) => {
    e.stopPropagation();
    if (freeCount > 0) {
      setFreeCount(freeCount - 1);
    }
  };

  const increaseHotdog = (e) => {
    e.stopPropagation();
    setHotdogCount(hotdogCount + 1);
  };

  const decreaseHotdog = (e) => {
    e.stopPropagation();
    if (hotdogCount > 0) {
      setHotdogCount(hotdogCount - 1);
    }
  };

  const totalPrice = cheeseCount * 550 + freeCount * 245 + hotdogCount * 239;
  const itemCount = cheeseCount + freeCount + hotdogCount;

  const renderBasketItems = () => {
    if (itemCount === 0) {
      return (
        <div>
          <h2>Тут пока пусто :(</h2>
        </div>
      );
    } else {
      let containerClass = styles.itemsContainer;

      if (showItems) {
        containerClass = styles.itemsContainerOpen;
      }

      return (
        <div className={containerClass}>
          {data.map((item) => {
            let count = 0;
            let increase = () => {};
            let decrease = () => {};

            if (item.id === "cheese") {
              count = cheeseCount;
              increase = increaseCheese;
              decrease = decreaseCheese;
            } else if (item.id === "free") {
              count = freeCount;
              increase = increaseFree;
              decrease = decreaseFree;
            } else if (item.id === "hotdog") {
              count = hotdogCount;
              increase = increaseHotdog;
              decrease = decreaseHotdog;
            }

            if (count === 0) {
              return null;
            } else {
              return (
                <div key={item.id}>
                  <div className={styles.wrapperBuy}>
                    <img src={item.image} alt={item.name} />
                    <div className={styles.infoCheese}>
                      <h2>{item.name}</h2>
                      <p>{item.weight}</p>
                      <h2>{item.price}₽</h2>
                    </div>
                    <div className={styles.countCheese}>
                      <button onClick={decrease}>-</button>
                      <span>{count}</span>
                      <button onClick={increase}>+</button>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
      );
    }
  };

  return (
    <>
      <div className={styles.background}>
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
                <button>Оформить заказ</button>
              </div>
              <div className={styles.freeget}>
                <img src={FreeDelivery} alt="free_delivery" />
                <p>Бесплатная доставка</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Basket;
