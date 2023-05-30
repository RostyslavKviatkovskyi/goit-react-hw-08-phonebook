import { createSlice } from '@reduxjs/toolkit';

const initialFilter = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilter,
  reducers: {
    updateFilter(state, action) {
      return action.payload;
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
