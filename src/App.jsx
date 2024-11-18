import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Error from "./error/Error";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Login from "./login/Login";
import HomePage from "./pages/homePage/HomePage";
import Register from "./register/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/FB";

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {showHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomePage productType="burgers" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/snacks" element={<HomePage productType="snacks" />} />
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
