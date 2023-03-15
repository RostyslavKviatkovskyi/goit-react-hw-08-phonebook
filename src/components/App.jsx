import { useState, useEffect, useMemo } from 'react';
// import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './Contacts/Contacts';
import { ContactForm } from './Form/Form';
import { Filter } from './Filter/Filter';
import { Wrapper } from './AppStyled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? '';
  });
  const [filter, setFilter] = useState('');

  // useMemo
  const normalizedFilter = useMemo(() => filter.toLowerCase(), [filter]);
  const filteredContacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      ),
    [contacts, normalizedFilter]
  );

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const formSubmitHandler = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      window.alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => [
      ...prevState,
      { id: nanoid(), name: name, number: number },
    ]);
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Wrapper>
      <h1>Phonebook</h1>

      <ContactForm
        onSubmit={formSubmitHandler}
        onDeleteContact={deleteContact}
      />

      <h2>Contacts</h2>

      <Filter value={filter} onChange={changeFilter} />

      <ContactList
        contacts={filteredContacts}
        onDeleteContacts={deleteContact}
      />
    </Wrapper>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       // console.log('Updated contacts');
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   formSubmitHandler = data => {
//     if (this.state.contacts.find(contact => contact.name === data.name)) {
//       window.alert(`${data.name} is already in contacts`);
//       return;
//     }
//     this.setState(prevState => ({
//       ...prevState,
//       contacts: [
//         ...prevState.contacts,
//         { id: nanoid(), name: data.name, number: data.number },
//       ],
//     }));
//   };

//   render() {
//     const normalizedFilter = this.state.filter.toLowerCase();
//     const filteredContacts = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );

//     return (
//       <Wrapper>
//         <h1>Phonebook</h1>
//         <ContactForm
//           onSubmit={this.formSubmitHandler}
//           onDeleteContact={this.deleteContact}
//         />

//         <h2>Contacts</h2>
//         <Filter value={this.state.filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={filteredContacts}
//           onDeleteContacts={this.deleteContact}
//         />
//       </Wrapper>
//     );
//   }
// }
