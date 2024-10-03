import React from "react";
import Basket from "../basket/Basket";
import meetBomb from "../assets/meetBomb.png";
import bigCheese from "../assets/BigCheese.png";
import Sitniy from "../assets/Sitniy.png";
import HardHit from "../assets/HardHit.png";
import infinityCl from "../assets/infinityCl.png";
import Italian from "../assets/Italian.png";
import styles from "./main.module.scss";

export default function Main(props) {
  return (
    <main className={styles.main}>
      <div className={styles.wrapperBasket}>
        <h1 className={styles.spanDown}></h1>
        <Basket />
      </div>
      <div className={styles.wrapperChoose}>
        <h1>Бургеры</h1>
        <div className={styles.wrapperCardItem}>
          <div className={styles.cardItem}>
            <img src={meetBomb} alt="meetBomb" />
            <h2>689₽</h2>
            <p>Мясная бомба</p>
            <span>520г</span>
            <button>Добавить</button>
          </div>
          <div className={styles.cardItem}>
            <img src={bigCheese} alt="bigCheese" />
            <h2>550₽</h2>
            <p>Супер сырный</p>
            <span>512г</span>
            <button>Добавить</button>
          </div>
          <div className={styles.cardItem}>
            <img src={Sitniy} alt="Sitniy" />
            <h2>639₽</h2>
            <p>Сытный</p>
            <span>580г</span>
            <button>Добавить</button>
          </div>
          <div className={styles.cardItem}>
            <img src={HardHit} alt="HardHit" />
            <h2>480₽</h2>
            <p>Тяжелый удар</p>
            <span>470г</span>
            <button>Добавить</button>
          </div>
          <div className={styles.cardItem}>
            <img src={infinityCl} alt="infinityCl" />
            <h2>450₽</h2>
            <p>Вечная классика</p>
            <span>450г</span>
            <button>Добавить</button>
          </div>
          <div className={styles.cardItem}>
            <img src={Italian} alt="Italian" />
            <h2>560₽</h2>
            <p>Итальянский</p>
            <span>510г</span>
            <button>Добавить</button>
          </div>
        </div>
      </div>
    </main>
  );
}