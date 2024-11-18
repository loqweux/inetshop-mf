import React from "react";
import chooseData from "./choose.json";
import styles from "./nav.module.scss";

function Nav({ setProductType, productType }) {
  return (
    <div className={styles.wrapperChoose}>
      {chooseData.map((item) => {
        const type = item.name_product;
        const isActive = type === productType;
        return (
          <button
            key={item.id}
            onClick={() => setProductType(type)}
            className={isActive ? styles.active : ""}
          >
            <img src={item.image} alt={item.label} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default Nav;
