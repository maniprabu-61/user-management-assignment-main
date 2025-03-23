import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./pages/Navbar";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/UserDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import "./App.css";
import Welcome from "./pages/Welcome";
// ✅ Protected Route Component
const ProtectedRoute = ({
  children,
  role,
}: {
  children: any;
  role?: string;
}) => {
  const { user, token } = useSelector((state: any) => state.auth);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const App: React.FC = () => {
  const { user, token } = useSelector((state: any) => state.auth);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              user?.role === "admin" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/welcome" />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Admin Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        {/* Protected Admin Route */}
        <Route
          path="/analytics"
          element={
            <ProtectedRoute role="admin">
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/welcome" element={<Welcome />} />
        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
