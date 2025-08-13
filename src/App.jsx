import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Layout/Navbar/Navbar";
import Home from "./Pages/Home";
import Footer from "./Layout/Footer/Footer";
import JoinWaitlist from "./Pages/waitlist";
import ThankYou from "./Pages/ThankYou";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join-waitlist" element={<JoinWaitlist />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
