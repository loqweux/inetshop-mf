import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Error from "./error/Error";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Login from "./login/Login";
import HomePage from "./pages/homePage/HomePage";
import Register from "./register/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logoutUser } from "./services/FB";

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <div>
      {showHeader && <Header onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/snacks"
          element={
            isAuthenticated ? (
              <HomePage productType="snacks" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login setHidden={setShowHeader} />} />
        <Route
          path="/register"
          element={<Register setHidden={setShowHeader} />}
        />
        <Route path="*" element={<Error setHidden={setShowHeader} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
