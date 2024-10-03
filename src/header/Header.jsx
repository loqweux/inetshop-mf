import React from "react";
import logo from "../assets/Logo.png";
import kitchen from "../assets/kitchen.png";
import head_burger from "../assets/head_burger.png";
import chooseData from "./choose.json";
import burgers from "../assets/Burgers.png";
import zakusk from "../assets/Zakusk.png";
import hotDogs from "../assets/Hot-dogs.png";
import combo from "../assets/Combo.png";
import shayrma from "../assets/Shayrma.png";
import pizza from "../assets/pizza.png";
import bok from "../assets/Bok.png";
import decerts from "../assets/Decerts.png";
import souses from "../assets/Souses.png";
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
            let image;
            switch (item.id) {
              case 1:
                image = burgers;
                break;
              case 2:
                image = zakusk;
                break;
              case 3:
                image = hotDogs;
                break;
              case 4:
                image = combo;
                break;
              case 5:
                image = shayrma;
                break;
              case 6:
                image = pizza;
                break;
              case 7:
                image = bok;
                break;
              case 8:
                image = decerts;
                break;
              case 9:
                image = souses;
                break;
              default:
                return;
            }
            return (
              <button key={item.id}>
                <img src={image} alt={item.label} />
                {item.label}
              </button>
            );
          })}
      </div>
    </>
  );
}
