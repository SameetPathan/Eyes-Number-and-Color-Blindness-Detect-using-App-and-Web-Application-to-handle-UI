import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import BackgroundC from "./components/background";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ColorTester from "./components/CheckUpCode/ColorCheckUp";
import NumberTester from "./components/CheckUpCode/EyesCheckup";


function App() {
  const [loggedStatus, setLoggedStatus] = useState(true);
  const [currentAccount, setCurrentAccount] = useState(false);

  const [colors, setColors] = useState([]);

  const [fontsized, setfontsized] = useState(10);

  useEffect(() => {
    let cookieValue = Cookies.get('userstatus');
    if(cookieValue){
      setLoggedStatus(true)
    }else{
      setLoggedStatus(false)
    }
   
  });

  return (
    <Router>
      <Navbar setLoggedStatus={setLoggedStatus} setColors={setColors} setfontsized={setfontsized} loggedStatus={loggedStatus} setCurrentAccount={setCurrentAccount} />
      <Routes>
        {loggedStatus ? (
          <>
          <Route
            exact
            path="/eyes-number"
            element={<NumberTester></NumberTester>}
          />

          <Route
          exact
          path="/eyes-color"
          element={<ColorTester></ColorTester>}
        />

        <Route
        exact
        path="/"
        element={<Home currentAccount={currentAccount} colors={colors} fontsized={fontsized}></Home>}
      />

          </>
        ) : (
          <>
            <Route exact path="/" element={<BackgroundC />} />
            <Route path="*" element={<BackgroundC />} />
          </>
        )}
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
