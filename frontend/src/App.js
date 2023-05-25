import React from "react";
import "./style/index.css";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "./component/SignIn";
import { Navbar } from "./component/Navbar";
import { Homepage } from "./component/Homepage";

export const getUserID = _ => {
  let token;
  if (localStorage.getItem("rememberMe") === "true")
    token = localStorage.getItem("u");
  else
    token = sessionStorage.getItem("u");
  return fetch("/api/authenticatelogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: token
    })
  })
    .then((res) => res.json())
    .then((data) => {
      return String(data.userID);
    })
    .catch(error => {
      console.log(error);
      return "none";
    });
};
export const logOut = _ => {
  sessionStorage.removeItem("u");
  localStorage.removeItem("u");
  localStorage.removeItem("rememberMe");
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Navbar page="signin"/>}>
          <Route path="" element={<SignIn/>}/>
        </Route>
        {/* <Route path="/footagedetection" element={<Navbar page="footagedetection"/>}>
          <Route path="" element={<FootageDetection/>}/>
        </Route>
        <Route path="/capturedcrime" element={<Navbar page="capturedcrime"/>}>
          <Route path="" element={<CapturedCrimeLog/>}/>
        </Route> */}
        <Route path="*" element={<Navbar page="homepage"/>}>
          <Route path="" element={<Homepage/>}/>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
