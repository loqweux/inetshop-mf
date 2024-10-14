import React from "react";
import Basket from "../basket/Basket";
import styles from "./main.module.scss";
import data from "./burgers.json";

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
          {data.map((burger) => (
            <div key={burger.id} className={styles.cardItem}>
              <img src={burger.image} alt={burger.name} />
              <h2>{burger.price}₽</h2>
              <p>{burger.name}</p>
              <span>{burger.weight}</span>
              <button>Добавить</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
