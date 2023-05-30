import { ContactList } from './Contacts/ContactList';
import { ContactForm } from './Form/Form';
import { Filter } from './Filter/Filter';
import { Wrapper } from './AppStyled';

export const App = () => {
  return (
    <Wrapper>
      <h1>Phonebook</h1>

      <ContactForm />

      <h2>Contacts</h2>

      <Filter />
      <ContactList />
    </Wrapper>
  );
};
