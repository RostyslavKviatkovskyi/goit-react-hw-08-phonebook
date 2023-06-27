// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginThunk, profileThunk } from 'redux/auth/thunk';
// import { selectToken } from 'redux/selectors';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

export const LoginPage = () => {
  // const authToken = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    dispatch(loginThunk(newUser))
      .unwrap()
      .then(() => {
        dispatch(profileThunk());
        navigate('/contacts');
      })
      .catch();
  };

  // useEffect(() => {
  //   authToken && navigate('/contacts');
  // }, [authToken, navigate]);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Box>
          {/* <label htmlFor="">Email</label> */}
          <InputLabel>Email</InputLabel>
          {/* <input name="email" type="email" /> */}
          <Input name="email" type="email" />
        </Box>
        <Box>
          {/* <label htmlFor="">Password</label> */}
          <InputLabel>Password</InputLabel>
          {/* <input name="password" type="password" /> */}
          <Input name="password" type="password" />
        </Box>
        <Box>
          {/* <Link to="/register">To rigistration page</Link> */}
          <Button component={Link} to="/register" sx={{ color: '#000000' }}>
            Register
          </Button>
          {/* <button type="submit">Login</button> */}
          <Button type="submit" sx={{ color: '#000000' }}>
            Login
          </Button>
        </Box>
      </form>
    </>
  );
};
