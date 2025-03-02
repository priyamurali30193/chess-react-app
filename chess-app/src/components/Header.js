import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase"; // ✅ Import Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth"; // ✅ Import Firebase methods
import LoginPopup from "./Loginpop"; // ✅ Import LoginPopup component
import "../styles/Header.css";
import logo from "../assets/logo.webp";

const Header = () => {
  const [user, setUser] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    // ✅ Listen for authentication changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // ✅ Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AppBar position="fixed" className="header-appbar">
      <Toolbar className="header-toolbar">
        {/* Logo & Title */}
        <div className="header-logo-container">
          <img src={logo} alt="logo" className="header-logo" />
          <Typography variant="h6" className="header-title">DChess</Typography>
        </div>

        {/* Navigation Links */}
        <div className="nav-links-container">
          <Button color="inherit" component={Link} to="/" className="nav-links">
            <FontAwesomeIcon icon={faHome} /> Home
          </Button>
          <Button color="inherit" component={Link} to="/chesspuzzles" className="nav-links">
            <FontAwesomeIcon icon={faPuzzlePiece} /> Chess Puzzles
          </Button>
        </div>

        {/* User Info */}
        <div className="user-info">
          {user ? (
            <>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
              <Typography variant="body1" className="username">
                {user.displayName || user.email} {/* ✅ Show user name or email */}
              </Typography>
              <Button color="inherit" onClick={handleLogout} className="nav-links">
                Logout
              </Button>
            </>
          ) : (
            <IconButton color="inherit" onClick={() => setOpenLogin(true)} className="login-icon">
              <FaSignInAlt />
            </IconButton>
          )}
        </div>
      </Toolbar>

      {/* ✅ Login Popup */}
      <LoginPopup open={openLogin} handleClose={() => setOpenLogin(false)} setUser={setUser} />
    </AppBar>
  );
};

export default Header;
