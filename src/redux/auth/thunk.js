import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance, removeToken, setToken } from 'redux/operations';

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (body, thunkAPI) => {
    try {
      const response = await instance.post('/users/signup', body);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const response = await instance.post('/users/login', body);
      setToken(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const profileThunk = createAsyncThunk(
  'auth/profile',
  async (body, thunkAPI) => {
    try {
      const response = await instance.get('/users/current', body);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logOut',
  async (_, thunkAPI) => {
    try {
      const response = await instance.post('/users/logout');
      removeToken();
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.access_token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setToken(persistedToken);
      const res = await instance.get('/users/current');
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
