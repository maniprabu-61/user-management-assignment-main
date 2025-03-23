import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Card
        sx={{
          width: "420px",
          padding: 4,
          boxShadow: 3,
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome, {user?.email || "User"}! 🎉
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
            You have successfully signed in. Explore your here and enjoy the
            experience.
          </Typography>

          {user?.role === "admin" && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={Link}
              to="/dashboard"
              sx={{ mb: 2, p: 1.5 }}
            >
              Go to Dashboard
            </Button>
          )}

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleLogout}
            sx={{ p: 1.5 }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Welcome;
