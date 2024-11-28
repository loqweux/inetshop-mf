  import React, { useState, useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { NavLink, useNavigate } from "react-router-dom";
  import burger from "../assets/head_burger.png";
  import { loginUser } from "../services/FB";
  import "./Login.scss";

  function Login({ setHidden }) {
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

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        try {
          const userCredential = await loginUser(data.email, data.password);
          localStorage.setItem("user", JSON.stringify(userCredential.user));
          navigate("/");
        } catch (error) {
          setErrors({ global: "Ошибка входа. Проверьте данные." });
        }
      }
    };

    return (
      <div className="login">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="wrapper-item">
            <div className="img-item">
              <img src={burger} alt="burger" />
            </div>
            <div className="mainForm">
              <h1>Вход</h1>
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
              <button type="submit">Войти</button>
              <p>
                Еще нет учетной записи?{" "}
                <NavLink to="/register">Зарегистрируйтесь сейчас</NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }

  export default Login;
