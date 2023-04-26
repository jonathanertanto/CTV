import React from "react";
import "./style/index.css";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "./component/SignIn";
import { Navbar } from "./component/Navbar";
import { FootageDetection } from "./component/FootageDetection";
import { CapturedCrimeLog } from "./component/CapturedCrimeLog";

export const getUserID = _ => {
  return "none";
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Navbar page="signin"/>}>
          <Route path="" element={<SignIn/>}/>
        </Route>
        <Route path="/footagedetection" element={<Navbar page="footagedetection"/>}>
          <Route path="" element={<FootageDetection/>}/>
        </Route>
        <Route path="/capturedcrime" element={<Navbar page="capturedcrime"/>}>
          <Route path="" element={<CapturedCrimeLog/>}/>
        </Route>
        <Route path="*" element={<Navbar page="signin"/>}>
          <Route path="" element={<SignIn/>}/>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
