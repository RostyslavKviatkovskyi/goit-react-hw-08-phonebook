import {
  combineReducers,
  configureStore,
  createEntityAdapter,
  createSelector,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
// import { createSlice, nanoid } from '@reduxjs/toolkit';
// import { isNotNull } from '../helper';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

// const contactsAdapter = createEntityAdapter();

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: contactsAdapter.getInitialState({
//     filterName: '',
//   }),
//   reducers: {
//     addContact: (state, action) => {
//       contactsAdapter.addOne(state, { ...action.payload, id: nanoid() });
//     },
//     deleteContact: (state, action) => {
//       contactsAdapter.removeOne(state, action.payload);
//     },
//     setSearch: (state, action) => {
//       state.filterName = action.payload ?? '';
//     },
//     removeSearch: (state, action) => {
//       state.filterName = '';
//     },
//   },
// });

// export const { addContact, deleteContact, setSearch, removeSearch } =
//   contactsSlice.actions;
// export const contactsReducer = contactsSlice.reducer;

// const selectRootState = state => state;
// const selectState = state => state.contacts;

// const { selectById, selectIds } = contactsAdapter.getSelectors(selectState);

// const selectContactById = createSelector(
//   [(state, id) => (id ? selectById(state, id) ?? null : null)],
//   entity => entity
// );

// export const selectAllContacts = createSelector(
//   [selectRootState, selectIds, selectState],
//   (state, ids, stateContacts) =>
//     ids
//       .map(id => selectContactById(state, id))
//       .filter(isNotNull)
//       .filter(entity =>
//         entity.name
//           .toLowerCase()
//           .includes(stateContacts.filterName.toLowerCase())
//       )
// );

// export const selectFilterName = createSelector(
//   [selectState],
//   state => state.filterName
// );

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

// const rootReducer = combineReducers({
//   contacts: contactsReducer,
// });

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
