import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Error, Footer, Header, Login, Main, Register } from "./index";

function App() {
  const [hidden, setHidden] = useState(true);

  return (
    <div>
      <header>{hidden && <Header />}</header>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login setHidden={setHidden} />} />
          <Route
            path="/register"
            element={<Register setHidden={setHidden} />}
          />
          <Route path="/main" element={<Main />} />
          <Route path="*" element={<Error setHidden={setHidden} />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
