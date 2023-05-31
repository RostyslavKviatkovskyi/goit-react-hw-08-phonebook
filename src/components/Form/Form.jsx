// import { useState } from 'react';
// import React, { Component } from 'react';
import { Form, FormButton, LabelText } from './FormStyled';
import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from '../../redux/store';
import { addContact } from 'redux/contactsSlice';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.target;

    if (contacts.find(contact => contact.name === form.name.value)) {
      window.alert(`${form.name.value} is already in contacts`);
      // form.reset();
      return;
    }

    dispatch(
      addContact({
        name: form.elements.name.value,
        number: form.elements.number.value,
      })
    );
    form.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="">
        <LabelText>Name</LabelText>
        <input
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
        <LabelText>Number</LabelText>
        <input
          type="tel"
          name="number"
          // value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          // onChange={handleChange}
        />
      </label>
      <FormButton type="submit">Add Contact</FormButton>
    </Form>
  );
};
