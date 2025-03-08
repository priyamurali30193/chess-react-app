import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Loginpop from "./Loginpop.jsx";
import "../styles/Home.css";
import logo from "../images/kingmove.png";
import queen from "../images/queen.png";

const Home = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Left Content */}
      <div className="home-content">
        <Typography variant="h3" className="home-title">
          Welcome to DChess for kids
        </Typography>
        <p className="home-description">
          Play Chess online, challenge AI, solve puzzles, and improve your skills!
        </p>

        <div className="home-buttons">
          <Button className="play-button" onClick={() => navigate("/play")}>
            Play Now
          </Button>
          <Button className="login-button" onClick={() => setLoginOpen(true)}>
            Login
          </Button>
        </div>

        {/* Chess Images */}
        <div className="home-image-container">
          <img src={logo} alt="Chess" className="home-image" />
          <img src={queen} alt="Chess" className="home-image" />
        </div>
      </div>

      {/* Chess Rules Section */}
      <div className="chess-rules">
        <Typography variant="h4" className="rules-title">
          Chess Rules
        </Typography>
        <ul className="rules-list">
          <li>♟️ Each player starts with 16 pieces.</li>
          <li>♞ Knights move in an "L" shape.</li>
          <li>♝ Bishops move diagonally.</li>
          <li>♜ Rooks move horizontally and vertically.</li>
          <li>♛ Queens move in any direction.</li>
          <li>♚ The King must be protected at all costs.</li>
          <li>🏆 Checkmate the opponent's King to win.</li>
        </ul>
      </div>

      {/* Login Popup */}
      <Loginpop open={isLoginOpen} handleClose={() => setLoginOpen(false)} />

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} DChess. All Rights Reserved.</p>
        <p>
          <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
