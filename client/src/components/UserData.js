import { useState } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

const UserData = ({
  dispatch,
  history,
  error,
  username,
  loggedUserId,
  changeUserPassword,
}) => {
  const [passwords, setPasswords] = useState({ password: '', confirm: '' });

  const onChange = (e) => {
    document.getElementById('error-message').textContent = '';
    document.getElementById('editing').classList.remove('hidden');
    document.getElementById('submitted').classList.add('hidden');
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (passwords.password.length < 6) {
      document.getElementById('error-message').textContent =
        'Please enter a password of 6 chars or more';
    } else if (passwords.password !== passwords.confirm) {
      document.getElementById('error-message').textContent =
        'Passwords do not match';
    } else {
      changeUserPassword(dispatch, loggedUserId, passwords.password);
      document.getElementById('editing').classList.add('hidden');
      document.getElementById('submitted').classList.remove('hidden');
      setTimeout(() => {
        history.push('/');
      }, 1500);
    }
  };

  const onToggleView = () => {
    const elements = document.getElementsByClassName('pass');
    [...elements].forEach((x) => {
      x.type = x.type === 'password' ? 'text' : 'password';
    });
  };

  return (
    <>
      <div id='editing'>
        <Alert variant='primary'>Change Password for {username}</Alert>
      </div>
      <div id='submitted' className='hidden'>
        <Alert variant='success'>Data Submitted</Alert>
      </div>
      <div id='error-message' style={{ color: 'red' }}></div>
      {error ? (
        <Alert variant='danger'> {error.message}</Alert>
      ) : (
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              type='password'
              name='password'
              value={passwords.password}
              placeholder='Password'
              onChange={onChange}
              className='pass'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='password'
              name='confirm'
              value={passwords.confirm}
              placeholder='Confirm Password'
              onChange={onChange}
              className='pass'
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type='checkbox'
              onChange={onToggleView}
              style={{ display: 'inline-block' }}
            />{' '}
            View Passwords
          </Form.Group>
          <Form.Group>
            <Button as='input' type='submit' value='Submit' />
          </Form.Group>
        </Form>
      )}
    </>
  );
};

export default UserData;
