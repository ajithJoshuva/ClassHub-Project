import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home.js";
import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import Dashboard from "./dashboard/dashboard.js";
import Createroom from "./dashboard/room-button/createroom.js";
import Joinroom from "./dashboard/room-button/joinroom.js";
import Myroom from "./dashboard/room-button/myroom.js";
import Homework from "./dashboard/room-button/homework.js";
import Hwview from "./dashboard/room-button/hwview.js"

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  console.log(isLoggedIn);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn === "true" ?
              <Dashboard />
              : <Home />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/createroom" element={<Createroom />} />
          <Route path="/dashboard/joinroom" element={<Joinroom />} />
          <Route path="/dashboard/myroom" element={<Myroom />} />
          <Route path="/dashboard/homework" element={<Homework />} />
          <Route path="/dashboard/homework/hwview" element={<Hwview />} />
        </Routes>
        {/* <ImageUpload/> */}
      </div>
    </Router>
  );
}

export default App;
