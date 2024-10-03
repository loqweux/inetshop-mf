import React from "react";
import logoOrange from "../assets/LogoOrange.png";
import kitchenOrange from "../assets/KitchenOrange.png";
import Call from "../assets/Call.png";
import vk from "../assets/vk.png";
import tg from "../assets/tg.png";
import styles from "./footer.module.scss";

export default function Footer(props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapperInfo}>
        <div className={styles.logoInfo}>
          <img src={logoOrange} alt="logoOrange" />
          <img src={kitchenOrange} alt="kitchenOrange" />
        </div>
        <div className={styles.wrapperInformation}>
          <div className={styles.numberInfo}>
            <p>Номер для заказа</p>
            <div className={styles.wrapperCall}>
              <img src={Call} alt="call" />
              <span>+7(930)833-38-11</span>
            </div>
          </div>
          <div className={styles.socialInfo}>
            <p>Мы в соцсетях</p>
            <div className={styles.wrapperSocial}>
              <img src={vk} alt="vk" />
              <img src={tg} alt="tg" />
            </div>
          </div>
        </div>
        <div className={styles.noInfo}></div>
      </div>
      <div className={styles.wrapperEnd}>
        <p>© YourMeal, 2022</p>
        <p>Design: Anastasia Ilina</p>
      </div>
    </footer>
  );
}
