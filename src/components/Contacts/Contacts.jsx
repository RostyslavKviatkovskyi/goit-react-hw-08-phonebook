import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListButton } from './ContactsStyled';

export const ContactList = ({ contacts, onDeleteContacts }) => {
  return (
    <>
      {contacts.length > 0 && (
        <List>
          {contacts.map(({ name, id, number }) => (
            <ListItem key={id}>
              <p>
                {name}: {number}
              </p>
              <ListButton onClick={() => onDeleteContacts(id)}>
                Delete
              </ListButton>
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
