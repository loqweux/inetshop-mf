import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import burger from "../assets/head_burger.png";
import { registerUser } from "../services/FB";
import "./Register.scss";

function Register({ setHidden }) {
  const navigate = useNavigate();

  useEffect(() => {
    setHidden(false);
    return () => {
      setHidden(true);
    };
  }, [setHidden]);

  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});

  const onSubmit = async (data) => {
    const newErrors = {};

    if (!data.email) {
      newErrors.email = "Введите email";
    }

    if (!data.password) {
      newErrors.password = "Введите пароль";
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        await registerUser(data.email, data.password);
        navigate("/");
      } catch (error) {
        setErrors({ global: "Ошибка регистрации. Попробуйте снова." });
      }
    }
  };

  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="wrapper-item">
          <div className="img-item">
            <img src={burger} alt="burger" />
          </div>
          <div className="mainForm">
            <h1>Регистрация</h1>
            <input type="text" placeholder="Email" {...register("email")} />
            {errors.email && (
              <div className="error-container">
                <span className="error-text">{errors.email}</span>
              </div>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <div className="error-container">
                <span className="error-text">{errors.password}</span>
              </div>
            )}

            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <div className="error-container">
                <span className="error-text">{errors.confirmPassword}</span>
              </div>
            )}

            <button type="submit">Зарегистрироваться</button>
            <p>
              Уже есть аккаунт?
              <NavLink to="/login"> Войдите</NavLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
