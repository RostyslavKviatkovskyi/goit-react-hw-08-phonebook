import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUpThunk } from 'redux/auth/thunk';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    dispatch(signUpThunk(newUser))
      .then(() => {
        navigate('/login');
        // dispatch(
        //   loginThunk({
        //     email: e.target.elements.email.value,
        //     password: e.target.elements.password.value,
        //   })
        // );
      })
      .catch(error => console.log(error.message));
  };
  return (
    <>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <Box>
          {/* <label htmlFor="">Name</label> */}
          <InputLabel>Name</InputLabel>
          {/* <input name="name" type="text" /> */}
          <Input name="name" type="text" />
        </Box>
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
          {/* <Link to="/login">To login page</Link> */}
          <Button component={Link} to="/login" sx={{ color: '#000000' }}>
            Login
          </Button>
          {/* <button type="submit">Register</button> */}
          <Button type="submit" sx={{ color: '#000000' }}>
            Register
          </Button>
        </Box>
      </form>
    </>
  );
};
