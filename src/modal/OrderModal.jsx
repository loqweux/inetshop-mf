import React, { useState } from "react";
import styles from "../app.module.scss";

const OrderModal = ({ isOpen, onClose, cartItems, totalPrice, itemCount }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("Самовывоз");
  const [address, setAddress] = useState("");
  const [floor, setFloor] = useState("");
  const [intercom, setIntercom] = useState("");

  if (!isOpen) return null;

  const closeModal = (e) => {
    e.stopPropagation();
    onClose();
  };

  const deliveryCharge = totalPrice > 1000 ? 0 : 199;
  return (
    <div className={styles.modalBackground} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h1>Доставка</h1>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>

        <div className={styles.formGroup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ваш телефон"
            required
          />
        </div>

        <div className={styles.deliveryMethod}>
          <div>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="Самовывоз"
                checked={deliveryMethod === "Самовывоз"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              Самовывоз
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="Доставка"
                checked={deliveryMethod === "Доставка"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              Доставка
            </label>
          </div>
        </div>

        {deliveryMethod === "Доставка" && (
          <div className={styles.formGroup}>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Улица, дом, квартира"
              required
            ></textarea>
          </div>
        )}

        {deliveryMethod === "Доставка" && (
          <div className={styles.floorIntercom}>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="Этаж"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={intercom}
                onChange={(e) => setIntercom(e.target.value)}
                placeholder="Домофон"
              />
            </div>
          </div>
        )}

        <div className={styles.orderSummary}>
          <h2>Количество товаров: {itemCount}</h2>
          <h3>
            Итого: {totalPrice}₽
            {deliveryCharge > 0 && (
              <>
                <span className={styles.deliveryCharge}>
                  {" "}
                  + {deliveryCharge}₽ (доставка)
                </span>
              </>
            )}
          </h3>
        </div>
        <button className={styles.submitButton}>Оформить</button>
      </div>
    </div>
  );
};

export default OrderModal;
