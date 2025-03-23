import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserAnalytics,
  fetchSignupTrends,
} from "../features/analytics/analyticsSlice";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AnalyticsDashboard = () => {
  const dispatch = useDispatch();
  const { userStats } = useSelector((state: any) => state.analytics);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(fetchUserAnalytics() as any);
    dispatch(fetchSignupTrends() as any);
  }, [dispatch]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      {/* Metrics Overview */}
      <Grid container spacing={3} marginTop={4}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{userStats?.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">New Sign-Ups (30 days)</Typography>
              <Typography variant="h4">{userStats?.newUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Users (7 days)</Typography>
              <Typography variant="h4">{userStats?.activeUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        padding={2}
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6" color="primary">
          Filter by Date
        </Typography>
        <Box display="flex" gap={2} width="100%" justifyContent="center">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            dateFormat="yyyy/MM/dd"
            className="custom-datepicker"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            dateFormat="yyyy/MM/dd"
            className="custom-datepicker"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default AnalyticsDashboard;
