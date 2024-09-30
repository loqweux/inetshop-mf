import { useState } from "react";
import Cheese from "./assets/Cheese.png";
import Free from "./assets/Free.png";
import Hotdog from "./assets/Hot-dog.png";
import FreeDelivery from "./assets/freegot.png";
import styles from "./app.module.scss";

function App() {
  const [cheeseCount, setCheeseCount] = useState(0);
  const [freeCount, setFreeCount] = useState(0);
  const [hotdogCount, setHotdogCount] = useState(0);

  const increaseCheese = () => {
    setCheeseCount((prev) => prev + 1);
  };

  const decreaseCheese = () => {
    if (cheeseCount > 0) {
      setCheeseCount((prev) => prev - 1);
    }
  };

  const increaseFree = () => {
    setFreeCount((prev) => prev + 1);
  };

  const decreaseFree = () => {
    if (freeCount > 0) {
      setFreeCount((prev) => prev - 1);
    }
  };

  const increaseHotdog = () => {
    setHotdogCount((prev) => prev + 1);
  };

  const decreaseHotdog = () => {
    if (hotdogCount > 0) {
      setHotdogCount((prev) => prev - 1);
    }
  };

  const totalPrice = cheeseCount * 550 + freeCount * 245 + hotdogCount * 239;

  return (
    <>
      <div className={styles.background}>
        <div className={styles.wrapperBasket}>
          <div className={styles.wrapperItems}>
            <h1>Корзина</h1>
            <span>{cheeseCount + freeCount + hotdogCount}</span>
          </div>
          <hr />
          <div className={styles.wrapperBuy}>
            <img src={Cheese} alt="Cheese" />
            <div className={styles.infoCheese}>
              <h2>Супер сырный</h2>
              <p>512г</p>
              <h2>550₽</h2>
            </div>
            <div className={styles.countCheese}>
              <button onClick={decreaseCheese}>-</button>
              <span>{cheeseCount}</span>
              <button onClick={increaseCheese}>+</button>
            </div>
          </div>
          <hr />
          <div className={styles.wrapperBuy}>
            <img src={Free} alt="free" />
            <div className={styles.infoCheese}>
              <h2>Картошка фри</h2>
              <p>180г</p>
              <h2>245₽</h2>
            </div>
            <div className={styles.countCheese}>
              <button onClick={decreaseFree}>-</button>
              <span>{freeCount}</span>
              <button onClick={increaseFree}>+</button>
            </div>
          </div>
          <hr />
          <div className={styles.wrapperBuy}>
            <img src={Hotdog} alt="hotdog" />
            <div className={styles.infoCheese}>
              <h2>Жгучий хот-дог</h2>
              <p>245г</p>
              <h2>239₽</h2>
            </div>
            <div className={styles.countCheese}>
              <button onClick={decreaseHotdog}>-</button>
              <span>{hotdogCount}</span>
              <button onClick={increaseHotdog}>+</button>
            </div>
          </div>
          <hr />
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
      </div>
    </>
  );
}

export default App;
