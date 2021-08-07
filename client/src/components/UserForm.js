import { useState, useEffect } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

const validateEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const UserForm = ({
  create,
  dispatch,
  addUser,
  history,
  userToUpdate,
  updateUser,
}) => {
  const [user, setUser] = useState(
    userToUpdate
      ? {
          name: userToUpdate.name,
          email: userToUpdate.email,
          admin: userToUpdate.admin ?? false,
        }
      : {
          name: '',
          email: '',
          password: '',
          admin: false,
        }
  );

  const onChange = (e) => {
    document.getElementById('error-message').textContent = '';
    document.getElementById('editing').classList.remove('hidden');
    document.getElementById('submitted').classList.add('hidden');
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleAdmin = () => {
    setUser({ ...user, admin: !user.admin });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (create && user.password.length < 6) {
      document.getElementById('error-message').textContent =
        'Please enter a password of 6 chars or more';
    } else if (create && (!user.email || !validateEmail(user.email))) {
      document.getElementById('error-message').textContent =
        'Please enter a valid email address for the user';
    } else {
      if (create) {
        addUser(dispatch, user);
      } else {
        updateUser(dispatch, userToUpdate._id, user);
      }
      document.getElementById('editing').classList.add('hidden');
      document.getElementById('submitted').classList.remove('hidden');
      setTimeout(() => {
        history.push('/users');
      }, 1500);
    }
  };

  useEffect(() => {
    if (!userToUpdate) {
      history.push('/user');
    }
  }, [userToUpdate, history]);

  return (
    <>
      {create && (
        <div id='editing'>
          <Alert variant='primary'>Create User</Alert>
        </div>
      )}
      {!create && (
        <div id='editing'>
          <Alert variant='primary'>Update User</Alert>
        </div>
      )}
      <div id='submitted' className='hidden'>
        <Alert variant='success'>Data Submitted</Alert>
      </div>

      <div id='error-message' style={{ color: 'red' }}></div>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={user.name}
            placeholder='User Name'
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          {create ? (
            <Form.Control
              type='email'
              name='email'
              value={user.email}
              placeholder='User Email'
              onChange={onChange}
              required
            />
          ) : (
            <Form.Control
              type='email'
              name='email'
              value={user.email}
              disabled
            />
          )}
        </Form.Group>

        {create && (
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='text'
              name='password'
              value={user.password}
              placeholder='Password'
              onChange={onChange}
              required
            />
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Check
            type='checkbox'
            label='Admin'
            name='admin'
            checked={user.admin}
            onChange={toggleAdmin}
          />
        </Form.Group>

        <Form.Group>
          <Button as='input' type='submit' value='Submit' />
        </Form.Group>
      </Form>
    </>
  );
};

export default UserForm;
