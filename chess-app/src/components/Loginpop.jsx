import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Alert, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../firebase";
import { updateProfile } from "firebase/auth"; // ✅ Import updateProfile

const LoginPopup = ({ open, handleClose, setUser }) => { // ✅ Accept setUser as prop
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignup, setIsSignup] = useState(false);

    const handleAuth = async () => {
        try {
            let userCredential;
            if (isSignup) {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: email.split("@")[0] }); // ✅ Set display name
            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            }

            setUser(userCredential.user); // ✅ Store user data
            console.log("✅ Auth Success:", userCredential.user);
            handleClose();
        } catch (err) {
            setError(err.message);
            console.error("❌ Authentication Error:", err.message);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {isSignup ? "Sign Up" : "Login"}
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}

                <TextField label="Email" type="email" fullWidth margin="dense" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" type="password" fullWidth margin="dense" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <Button variant="contained" color="primary" fullWidth onClick={handleAuth}>
                    {isSignup ? "Sign Up" : "Login"}
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    {isSignup ? "Already have an account?" : "Don't have an account?"} 
                    <Button color="secondary" onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? "Login" : "Sign Up"}
                    </Button>
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default LoginPopup;
