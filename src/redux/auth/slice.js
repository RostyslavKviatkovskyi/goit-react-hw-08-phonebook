import { loginThunk } from './thunk';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  access_token: '',
  isLoading: false,
  error: '',
};

const handlePending = state => {
  state.isLoading = true;
};
const handleFulfilled = (state, action) => {
  console.log(action);
  state.isLoading = false;
  state.error = '';
  state.access_token = action.payload.data;
};

const handleRejected = state => {
  state.isLoading = false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, handlePending)
      .addCase(loginThunk.fulfilled, handleFulfilled)
      .addCase(loginThunk.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
