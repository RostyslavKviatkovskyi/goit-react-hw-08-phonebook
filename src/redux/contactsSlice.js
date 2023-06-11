import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const contactsinitialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handleFulfilledGet = (state, action) => {
  state.contacts = action.payload;
};

const handleFulfilledPost = (state, action) => {
  state.contacts.push(action.payload);
};

const handleFulfilledDelete = (state, action) => {
  state.contacts = state.contacts.filter(el => el.id !== action.payload.id);
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsinitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledGet)
      .addCase(addContact.fulfilled, handleFulfilledPost)
      .addCase(deleteContact.fulfilled, handleFulfilledDelete)
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        handleRejected
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled
        ),
        handleFulfilled
      );
  },
});

// export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
