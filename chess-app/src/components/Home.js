import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "../styles/Home.css";
import DailyPuzzle from "./DailyPuzzle"; // Ensure the path is correct

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Common Hero Title - appears across both hero section & sidebar */}
      <div className="common-hero-title">
        <Typography variant="h1" className="common-title-text">
          DChess: Your Ultimate Chess Adventure!
        </Typography>
      </div>

      <div className="hero-info-container">
        {/* Hero Section (Left Side) */}
        <div className="hero-section">
          <div className="hero-content">
            <Typography variant="h5" className="hero-subtitle">
              At DChess, every move opens the door to a new adventure! Our app
              transforms the timeless game of chess into a vibrant, interactive
              playground designed especially for kids. Whether you're just
              beginning your chess journey or ready to master advanced strategies,
              DChess offers a world of fun puzzles, engaging challenges, and
              friendly online play—all tailored to inspire young minds.
              <br /><br />
              Embark on a thrilling quest where each game teaches valuable skills
              and sparks creativity. With easy-to-follow tutorials, brain-teasing
              puzzles, and playful competitions, you'll not only learn the art of
              chess but also boost your problem-solving skills and confidence.
              Step into a realm where chess becomes an epic journey—one move at a
              time.
              <br /><br />
              Ready to make your first move? Let the adventure begin at DChess!
            </Typography>
            <div className="hero-buttons">
              <Button className="play-button" onClick={() => navigate("/play")}>
                Play Now
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar: Chess Info & Daily Puzzle */}
        <div className="sidebar">
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
          <div className="daily-puzzle-section">
            <DailyPuzzle />
         
          </div>
        </div>
      </div>
    {/* Extra Content: Video Section with Info */}
{/* Extra Content: Video Section with Tutorial Info */}
<div className="extra-content">
  {/* Video Section */}
  <div className="video-section">
    <Typography variant="h4" className="section-title">
      Watch Our Tutorial
    </Typography>
    <div className="video-wrapper small-video">
      <iframe
        width="500"
        height="281"
        src="https://www.youtube.com/embed/CtLfUSaVhUM"
        title="How to Play Chess - Animated Cartoon Series for Beginners | Kids Academy"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  </div>

  {/* Tutorial Info Section */}
  <div className="tutorial-info">
    <Typography variant="h4" className="tutorial-info-title">
    Animated Cartoon Series for Beginners | Kids Academy
    </Typography>
    <Typography variant="body1" className="tutorial-info-text">
      In this video, you'll learn the basics of chess, including piece movements, key strategies, and fun tips to kick-start your chess journey! Our engaging tutorial is designed especially for kids to make learning chess fun and interactive.
    </Typography>
  </div>
</div>


      {/* Footer */}
      <footer className="home-footer">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} DChess. All Rights Reserved.
        </Typography>
        <Typography variant="body2">
          <a href="/about">About</a> | <a href="/contact">Contact</a> |{" "}
          <a href="/privacy">Privacy Policy</a>
        </Typography>
      </footer>
    </div>
  );
};

export default Home;
