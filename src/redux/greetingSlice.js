import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  value: '',
  status: 'idle',
};

export const fetchRandomGreeting = createAsyncThunk(
  'greetings/fetchRandomGreeting',
  async () => {
    try {
      const response = await axios(
        'http://localhost:3000/api/greetings/random',
      );
      if (!response) {
        throw new Error('Can not fetch greetings');
      }
      const { data } = response;

      return data.greeting;
    } catch (error) {
      throw new Error('Cannot fetch quote');
    }
  },
);

const greetingSlice = createSlice({
  name: 'greetings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomGreeting.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchRandomGreeting.fulfilled, (state, action) => ({
        ...state,
        status: 'Success',
        value: action.payload,
      }))
      .addCase(fetchRandomGreeting.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default greetingSlice.reducer;
