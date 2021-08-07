import { useState } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

const LoginForm = ({ dispatch, history, loginUser }) => {
  const [user, setUser] = useState({ email: '', password: '' });

  const onChange = (e) => {
    document.getElementById('editing').classList.remove('hidden');
    document.getElementById('submitted').classList.add('hidden');
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    document.getElementById('editing').classList.add('hidden');
    document.getElementById('submitted').classList.remove('hidden');
    setTimeout(() => {
      loginUser(dispatch, user);
      history.push('/');
    }, 1500);
  };

  return (
    <>
      <div id='editing'>
        <Alert variant='primary'>User Sign In</Alert>
      </div>
      <div id='submitted' className='hidden'>
        <Alert variant='success'>Logging {user.email} in ...</Alert>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            name='email'
            value={user.email}
            placeholder='Email Address'
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={user.password}
            placeholder='Password'
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Button as='input' type='submit' value='Sign In' />
        </Form.Group>
      </Form>
    </>
  );
};

export default LoginForm;
