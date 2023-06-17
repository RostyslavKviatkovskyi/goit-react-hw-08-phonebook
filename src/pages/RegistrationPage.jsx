import { useNavigate } from 'react-router-dom';
import { signUp } from 'redux/operations';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    signUp(newUser)
      .then(() => {
        console.log('created');
        navigate('/login');
      })
      .catch(error => error.message);
  };
  return (
    <>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Name</label>
          <input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};
