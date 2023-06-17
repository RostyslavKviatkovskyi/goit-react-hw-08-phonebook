import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from 'redux/operations';

export const loginThunk = createAsyncThunk('auth/login', async body => {
  await login(body);
});
