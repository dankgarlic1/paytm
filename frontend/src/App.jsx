import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./components/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/send" element={<SendMoney />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
