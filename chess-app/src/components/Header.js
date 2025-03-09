import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoginPopup from "./Loginpop";
import "../styles/Header.css";
import logo from "../assets/logo.webp";

const Header = () => {
  const [user, setUser] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AppBar position="fixed" className="header-appbar">
      <Toolbar className="header-toolbar">
        {/* Left Side: Logo, Title, and Nav Links */}
        <div className="header-left">
          <img src={logo} alt="logo" className="header-logo" />
          <Typography variant="h6" className="header-title">DChess</Typography>
          <div className="nav-links-container">
            <Button color="inherit" component={Link} to="/" className="nav-links">
              <FontAwesomeIcon icon={faHome} /> Home
            </Button>
            <Button color="inherit" component={Link} to="/chesspuzzles" className="nav-links">
              <FontAwesomeIcon icon={faPuzzlePiece} /> Chess Puzzles
            </Button>
          </div>
        </div>

        {/* Right Side: User Info / Login */}
        <div className="user-info">
          {!user ? (
            <Button color="inherit" onClick={() => setOpenLogin(true)} className="nav-links">
              <FaSignInAlt /> Login
            </Button>
          ) : (
            <>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
              <Typography variant="body1" className="username">
                {user.displayName || user.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout} className="nav-links">
                Logout
              </Button>
            </>
          )}
        </div>
      </Toolbar>

      <LoginPopup open={openLogin} handleClose={() => setOpenLogin(false)} setUser={setUser} />
    </AppBar>
  );
};

export default Header;
