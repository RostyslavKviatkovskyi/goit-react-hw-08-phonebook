export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filter;
export const selectToken = state => state.auth.access_token;
export const selectIsRefreshing = state => state.auth.isRefreshing;
