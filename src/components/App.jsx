import { ContactList } from './Contacts/ContactList';
import { ContactForm } from './Form/Form';
import { Filter } from './Filter/Filter';
import { Wrapper } from './AppStyled';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout';
import { Contacts } from 'pages/Contacts';
import { RegistrationPage } from 'pages/RegistrationPage';
import { LoginPage } from 'pages/LoginPage';

export const App = () => {
  return (
    // <Wrapper>
    //   <h1>Phonebook</h1>

    //   <ContactForm />

    //   <h2>Contacts</h2>

    //   <Filter />
    //   <ContactList />
    // </Wrapper>

    <Suspense>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>

      {/* <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Routes> */}
    </Suspense>
  );
};
