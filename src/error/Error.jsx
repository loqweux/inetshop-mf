import React, { useEffect } from "react";
import logo from "../assets/Logo.png";
import kitchen from "../assets/kitchen.png";
import head_burger from "../assets/head_burger.png";
import { NavLink } from "react-router-dom";
import styles from "./error.module.scss";

function Error({ setHidden }) {
  useEffect(() => {
    setHidden(false);
    return () => {
      setHidden(true);
    };
  }, []);
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
            <h1>Извините, но</h1>
            <h2>страничка не найдена!</h2>
            <p>Обратитесь в тех.поддержку, если это ошибка</p>
            <NavLink to="/">Вернуться</NavLink>
          </div>
        </div>
      </header>
    </>
  );
}

export default Error;
