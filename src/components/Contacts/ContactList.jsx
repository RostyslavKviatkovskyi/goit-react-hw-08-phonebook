import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListButton } from './ContactsListStyled';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteContact, selectAllContacts } from 'redux/store';
import { deleteContact } from 'redux/contactsSlice';
import { useMemo } from 'react';
import { selectContacts, selectFilter, selectFilters } from 'redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();

  // const contacts = useSelector(selectAllContacts);
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  // const normalizedFilter = useMemo(() => filter.toLowerCase(), [filter]);
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
      {contacts.length > 0 && (
        <List>
          {filteredContacts.map(({ name, id, number }) => (
            <ListItem key={id}>
              <p>
                {name}: {number}
              </p>
              <ListButton onClick={handleDelete(id)}>Delete</ListButton>
            </ListItem>
          ))}
        </List>
      )}
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
