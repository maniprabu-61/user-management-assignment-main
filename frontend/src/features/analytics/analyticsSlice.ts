import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5500/analytics";

// ✅ Helper function to get token
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ✅ Fetch User Analytics
export const fetchUserAnalytics = createAsyncThunk(
  "analytics/fetchUserAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/users/count`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Fetch Sign-Up Trends
export const fetchSignupTrends = createAsyncThunk(
  "analytics/fetchSignupTrends",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/users/trends`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Fetch Recent Activity
export const fetchUserActivity = createAsyncThunk(
  "analytics/fetchUserActivity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/users/activity`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Redux Slice
const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    userStats: null,
    trends: [],
    activity: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.userStats = action.payload;
      })
      .addCase(fetchUserAnalytics.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSignupTrends.fulfilled, (state, action) => {
        state.trends = action.payload;
      })
      .addCase(fetchUserActivity.fulfilled, (state, action) => {
        state.activity = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
