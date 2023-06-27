// import { ContactList } from './Contacts/ContactList';
// import { ContactForm } from './Form/Form';
// import { Filter } from './Filter/Filter';
// import { Wrapper } from './AppStyled';
import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout';
import { Contacts } from 'pages/Contacts';
import { RegistrationPage } from 'pages/RegistrationPage';
import { LoginPage } from 'pages/LoginPage';
import { PrivateRoute } from 'privateRoutes/PrivateRoute';
import { Homepage } from 'pages/Homepage';
import { PublicRoute } from 'PublicRoutes/PublicRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing, selectToken } from 'redux/selectors';
import { refreshUser } from 'redux/auth/thunk';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing && token) {
    return null;
  }

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Homepage />} />
          <Route
            path="register"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};
