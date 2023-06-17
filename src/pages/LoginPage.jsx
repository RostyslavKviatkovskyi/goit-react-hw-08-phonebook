import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { loginThunk } from 'redux/auth/thunk';

export const LoginPage = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    dispatch(loginThunk(newUser));
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
