import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  monthlyData: [],
  yearlyData: [],
  orders: [],
  loading: false,
  error: null,
};

export const getMonthlyData = createAsyncThunk(
  "adminDashboard/getMonthlyData",
  async (config, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getMonthWiseOrderIncome",
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getYearlyData = createAsyncThunk(
  "adminDashboard/getYearlyData",
  async (config, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getyearlyorders",
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrders = createAsyncThunk(
  "adminDashboard/getOrders",
  async (config, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getallorders",
        config
      );
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMonthlyData.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyData = action.payload;
      })
      .addCase(getMonthlyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getYearlyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getYearlyData.fulfilled, (state, action) => {
        state.loading = false;
        state.yearlyData = action.payload;
      })
      .addCase(getYearlyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminDashboardSlice.reducer;
