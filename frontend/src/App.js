import React from "react";
import "./style/index.css";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "./component/SignIn";
import { Navbar } from "./component/Navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Navbar page="signin"/>}>
          <Route path="" element={<SignIn/>}/>
        </Route>
        <Route path="*" element={<Navbar page="signin"/>}>
          <Route path="" element={<SignIn/>}/>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
