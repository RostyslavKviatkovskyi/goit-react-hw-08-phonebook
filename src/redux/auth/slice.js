import { logOutThunk, loginThunk, profileThunk } from './thunk';

const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const initialState = {
  access_token: '',
  isLoading: false,
  error: '',
  user: null,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = '';
  state.access_token = action.payload.token;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleProfileFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = '';
  state.user = action.payload;
};

const handleLogOutFulfilled = state => {
  state.isLoading = false;
  state.error = '';
  state.access_token = '';
  state.user = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, handleFulfilled)
      .addCase(profileThunk.fulfilled, handleProfileFulfilled)
      .addCase(logOutThunk.fulfilled, handleLogOutFulfilled)
      .addMatcher(
        isAnyOf(loginThunk.pending, profileThunk.pending),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          loginThunk.rejected,
          profileThunk.rejected,
          logOutThunk.rejected
        ),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;
