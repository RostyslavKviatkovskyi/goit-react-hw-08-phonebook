import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from './ContactsListStyled';
import { useDispatch, useSelector } from 'react-redux';

import { useMemo } from 'react';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/operations';

import Button from '@mui/material/Button';

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);

  const { isLoading, error } = useSelector(state => state.contacts);

  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
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
      {contacts.length > 0 && (
        <List>
          {filteredContacts.map(({ name, id, number }) => (
            <ListItem key={id}>
              <p>
                {name}: {number}
              </p>
              {/* <ListButton onClick={handleDelete(id)}>Delete</ListButton> */}
              <Button onClick={handleDelete(id)} sx={{ color: '#000000' }}>
                Delete
              </Button>
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
