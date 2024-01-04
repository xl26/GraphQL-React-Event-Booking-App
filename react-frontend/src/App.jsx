import { createContext, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/index";
import Events from "./components/Events/index";
import Bookings from "./components/Bookings/index";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import NavBar from "./components/Nav/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/home" Component={Home} />
          <Route path="/event" Component={Events} />
          <Route path="/mybookings" Component={Bookings} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/" Component={Login} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
