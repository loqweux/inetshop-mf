import React from "react";
import logo from "../assets/Logo.png";
import kitchen from "../assets/kitchen.png";
import head_burger from "../assets/head_burger.png";
import chooseData from "./choose.json";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapperLogo}>
          <img src={logo} alt="Logo" />
          <img src={kitchen} alt="kitchen" />
        </div>
        <div className={styles.wrapperBurgeradd}>
          <img src={head_burger} alt="head_burger" />
          <div className={styles.wrapInfo}>
            <h1>Только самые</h1>
            <h2>сочные бургеры!</h2>
            <p>Бесплатная доставка от 599₽</p>
            <button>Добавить</button>
          </div>
        </div>
      </header>
      <div className={styles.wrapperChoose}>
        {chooseData &&
          chooseData.map((item) => {
            return (
              <button key={item.id}>
                <img src={item.image} alt={item.label} />
                {item.label}
              </button>
            );
          })}
      </div>
    </>
  );
}
