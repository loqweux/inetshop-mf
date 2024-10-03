import { useState } from "react";
import FreeDelivery from "../assets/freegot.png";
import styles from "../app.module.scss";
import data from "../data/data.json";
import Cheese from "../assets/Cheese.png";
import FreeImage from "../assets/Free.png";
import Hotdog from "../assets/Hot-dog.png";

const updatedData = data.map((item) => {
  let image;
  switch (item.id) {
    case "cheese":
      image = Cheese;
      break;
    case "free":
      image = FreeImage;
      break;
    case "hotdog":
      image = Hotdog;
      break;
    default:
      image = item.image;
  }
  return { ...item, image };
});

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

  const increaseCheese = () => setCheeseCount(cheeseCount + 1);
  const decreaseCheese = () => {
    if (cheeseCount > 0) {
      setCheeseCount(cheeseCount - 1);
    }
  };
  const increaseFree = () => setFreeCount(freeCount + 1);
  const decreaseFree = () => {
    if (freeCount > 0) {
      setFreeCount(freeCount - 1);
    }
  };
  const increaseHotdog = () => setHotdogCount(hotdogCount + 1);
  const decreaseHotdog = () => {
    if (hotdogCount > 0) {
      setHotdogCount(hotdogCount - 1);
    }
  };
  const totalPrice = cheeseCount * 550 + freeCount * 245 + hotdogCount * 239;
  const itemCount = cheeseCount + freeCount + hotdogCount;
  return (
    <>
      <div className={styles.background}>
        <div className={styles.wrapperBasket}>
          <div className={styles.wrapperItems}>
            <h1>Корзина</h1>
            <span>{itemCount}</span>
          </div>
          {windowWidth <= 1005 && (
            <div className={styles.scrollToggle}>
              <button onClick={() => setShowItems((prev) => !prev)}>
                {(() => {
                  if (showItems) {
                    return "▲";
                  } else {
                    return "▼";
                  }
                })()}
              </button>
            </div>
          )}
          {windowWidth > 1005 && <hr />}
          {(() => {
            if (itemCount === 0) {
              return (
                <div>
                  <h2>Тут пока пусто :(</h2>
                </div>
              );
            } else if (
              windowWidth > 1005 ||
              (showItems && windowWidth <= 1005)
            ) {
              return updatedData.map((item) => {
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
              });
            }
          })()}
          {itemCount > 0 && (windowWidth > 1005 || showItems) && (
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
