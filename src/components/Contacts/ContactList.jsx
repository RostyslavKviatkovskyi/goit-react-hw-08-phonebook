import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListButton } from './ContactsListStyled';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteContact, selectAllContacts } from 'redux/store';
// import { deleteContact } from 'redux/contactsSlice';
import { useMemo } from 'react';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/operations';
// import { filterReducer } from 'redux/filterSlice';

export const ContactList = () => {
  const dispatch = useDispatch();

  // const contacts = useSelector(selectAllContacts);
  const contacts = useSelector(selectContacts);

  const { isLoading, error } = useSelector(state => state.contacts);

  const filter = useSelector(selectFilter);

  // const normalizedFilter = useMemo(() => filter.toLowerCase(), [filter]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = useMemo(
    () =>
      contacts.contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts.contacts, filter]
  );

  // const filteredContacts = contacts.filter(({ name }) =>
  //   name.toLowerCase().includes(filter.toLowerCase())
  // );

  const handleDelete = useCallback(
    id => event => {
      event.preventDefault();
      dispatch(deleteContact(id));
    },
    [dispatch]
  );

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {contacts.contacts.length > 0 && (
        <List>
          {filteredContacts.map(({ name, id, phone }) => (
            <ListItem key={id}>
              <p>
                {name}: {phone}
              </p>
              <ListButton onClick={handleDelete(id)}>Delete</ListButton>
            </ListItem>
          ))}
        </List>
      )}
      {error && <h2>{error.message}</h2>}
    </>
  );
};

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
