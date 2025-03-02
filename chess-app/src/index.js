import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ChessPuzzle from "./components/ChessPuzzle";
import App from "./App";  
import GamePage from "./components/GamePage.js"; // ✅ Import GamePage


const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot

root.render(
  <React.StrictMode>
    <Router>
      {/* Place Header outside Routes to make it appear across all pages */}
     {/* <Header />*/}
     <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<App />} />
        <Route path="/game" element={<GamePage />} /> {/* ✅ Add this */}
        
        <Route path="/chesspuzzles" element={<ChessPuzzle />} /> {/* Corrected route path */}
      </Routes>
    </Router>
  </React.StrictMode>
);
