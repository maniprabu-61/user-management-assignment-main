import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";

const Navbar = () => {
  const { user, token } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo or Title */}
          <Typography variant="h6" component={Link} to="/" sx={styles.logo}>
            MyApp
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {token ? (
              <>
                {user?.role === "admin" && (
                  <Button component={Link} to="/dashboard" sx={styles.navLink}>
                    Dashboard
                  </Button>
                )}
                {user?.role === "admin" && (
                  <Button component={Link} to="/analytics" sx={styles.navLink}>
                    Analytics
                  </Button>
                )}
                <Button onClick={handleLogout} sx={styles.logoutButton}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/signin" sx={styles.navLink}>
                  Sign In
                </Button>
                <Button component={Link} to="/signup" sx={styles.signupButton}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Styles Object
const styles = {
  logo: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      color: "#ddd",
    },
  },
  navLink: {
    color: "white",
    textTransform: "none",
    fontSize: "16px",
    "&:hover": {
      color: "#ddd",
    },
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  },
  signupButton: {
    backgroundColor: "#4caf50",
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  },
};

export default Navbar;
