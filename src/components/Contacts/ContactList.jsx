import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListButton } from './ContactsListStyled';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteContact, selectAllContacts } from 'redux/store';
import { deleteContact } from 'redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();

  // const contacts = useSelector(selectAllContacts);
  const contacts = useSelector(state => state.contacts);

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
          {contacts.map(({ name, id, number }) => (
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
  onDeleteContacts: PropTypes.func.isRequired,
};
