import { useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch(
      addContact({
        name: e.target.elements.name.value,
        number: e.target.elements.number.value,
      })
    );
    e.target.reset();
    // const form = e.target;

    // if (contacts.find(contact => contact.name === form.name.value)) {
    //   window.alert(`${form.name.value} is already in contacts`);
    //   // form.reset();
    //   return;
    // }

    //   dispatch(
    //     addContact({
    //       name: form.elements.name.value,
    //       number: form.elements.number.value,
    //     })
    //   );
    //   form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <label htmlFor="">
          {/* <LabelText>Name</LabelText> */}
          <InputLabel>Name</InputLabel>
          <Input
            type="text"
            name="name"
            // value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            // onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          {/* <LabelText>Number</LabelText> */}
          <InputLabel>Number</InputLabel>
          <Input
            type="tel"
            name="number"
            // value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            // onChange={handleChange}
          />
        </label>
      </Box>
      {/* <FormButton type="submit">Add Contact</FormButton> */}
      <Button type="submit" sx={{ color: '#000000' }}>
        Add Contact
      </Button>
    </form>
  );
};
