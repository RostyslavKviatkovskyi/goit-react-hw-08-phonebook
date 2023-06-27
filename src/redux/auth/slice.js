import { logOutThunk, loginThunk, profileThunk, refreshUser } from './thunk';

const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const initialState = {
  access_token: '',
  isLoading: false,
  error: '',
  user: null,
  isLoggedin: false,
  isRefreshing: true,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = '';
  state.access_token = action.payload.token;
  state.user = action.payload.user;
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

const handleRefreshPending = state => {
  state.isRefreshing = true;
};

const handleRefreshFulfilled = (state, action) => {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

const handleRefreshRejected = state => {
  state.isRefreshing = false;
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
      .addCase(refreshUser.pending, handleRefreshPending)
      .addCase(refreshUser.fulfilled, handleRefreshFulfilled)
      .addCase(refreshUser.rejected, handleRefreshRejected)
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
