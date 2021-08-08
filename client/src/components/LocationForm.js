import { useState, useEffect } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

const LocationForm = ({
  create,
  dispatch,
  addLocation,
  history,
  locationToUpdate,
  updateLocation,
}) => {
  const [location, setLocation] = useState(
    locationToUpdate
      ? {
          name: locationToUpdate.name,
          description: locationToUpdate.description,
        }
      : {
          name: '',
          description: '',
        }
  );

  const onChange = (e) => {
    document.getElementById('editing').classList.remove('hidden');
    document.getElementById('submitted').classList.add('hidden');
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (create) {
      addLocation(dispatch, location);
    } else {
      updateLocation(dispatch, locationToUpdate._id, location);
    }
    document.getElementById('editing').classList.add('hidden');
    document.getElementById('submitted').classList.remove('hidden');
    setTimeout(() => {
      history.push('/locations');
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    if (!locationToUpdate) {
      history.push('/location');
    }
  }, [locationToUpdate, history]);

  return (
    <>
      {create && (
        <div id='editing'>
          <Alert variant='primary'>Create Location</Alert>
        </div>
      )}
      {!create && (
        <div id='editing'>
          <Alert variant='primary'>Update Location</Alert>
        </div>
      )}
      <div id='submitted' className='hidden'>
        <Alert variant='success'>Data Submitted</Alert>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={location.name}
            placeholder='Location Name'
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={location.description}
            placeholder='Location Description'
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Button as='input' type='submit' value='Submit' />
        </Form.Group>
      </Form>
    </>
  );
};

export default LocationForm;
