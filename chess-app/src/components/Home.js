import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "../styles/Home.css";
import logo from "../images/kingmove.png";
import queen from "../images/queen.png";

const Home = () => {
  const navigate = useNavigate();
 
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <Typography variant="h2" className="hero-title">
            Welcome to DChess for Kids
          </Typography>
          <Typography variant="h5" className="hero-subtitle">
            Unleash your inner chess champion with fun puzzles and online play!
          </Typography>
          <div className="hero-buttons">
            <Button className="play-button" onClick={() => navigate("/play")}>
              Play Now
            </Button>
          </div>
        </div>
        <div className="hero-images">
          <img src={logo} alt="King Move" className="hero-image king" />
          <img src={queen} alt="Queen" className="hero-image queen" />
        </div>
      </div>

      {/* Info Section */}
      <div className="chess-info">
        <Typography variant="h4" className="info-title">
          Learn Chess the Fun Way!
        </Typography>
        <ul className="info-list">
          <li>♟️ Master the art of strategy with every move.</li>
          <li>♞ Enjoy puzzles and challenges at every level.</li>
          <li>♝ Improve your skills by playing against AI.</li>
          <li>♜ Engage in friendly online matches.</li>
          <li>♛ Discover new tactics with interactive tutorials.</li>
          <li>♚ Protect your King and checkmate your opponent.</li>
          <li>🏆 Become the ultimate chess champion!</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} DChess. All Rights Reserved.
        </Typography>
        <Typography variant="body2">
          <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/privacy">Privacy Policy</a>
        </Typography>
      </footer>
    </div>
  );
};

export default Home;
