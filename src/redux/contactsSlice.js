import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsinitialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsinitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.unshift(action.payload);
      },
      prepare({ name, number }) {
        return { payload: { name, number, id: nanoid() } };
      },
    },
    deleteContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
