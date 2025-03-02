import React from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

const LoginPopup = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="login-modal">
        <Typography variant="h5">Login to DChess</Typography>
        <TextField label="Email" fullWidth margin="dense" />
        <TextField label="Password" type="password" fullWidth margin="dense" />
        <Button variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginPopup;
