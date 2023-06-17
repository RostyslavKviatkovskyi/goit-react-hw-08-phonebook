import { Link, Outlet } from 'react-router-dom';
import { UserMenu } from './Logout';

export const SharedLayout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home page</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/contacts">Contacts</Link>
        <UserMenu />
      </nav>
      <Outlet />
    </>
  );
};
