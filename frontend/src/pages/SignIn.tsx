import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../features/auth/authSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, error } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user && token) {
      navigate(user.role === "admin" ? "/dashboard" : "/");
    }
  }, [user, token, navigate]);

  // ✅ Form Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

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
      <Card sx={{ width: 380, padding: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Sign In
          </Typography>

          {error && (
            <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
              {error?.statusCode === 401
                ? "Register first!"
                : error?.message || "An error occurred"}
            </Typography>
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => dispatch(signInUser(values) as any)}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <Field
                  as={TextField}
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2, p: 1.5, fontWeight: "bold" }}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
