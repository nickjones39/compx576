import { useState, useEffect } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

const StatusForm = ({
  create,
  dispatch,
  addStatus,
  history,
  statusToUpdate,
  updateStatus,
}) => {
  const [status, setStatus] = useState(
    statusToUpdate
      ? {
          name: statusToUpdate.name,
          description: statusToUpdate.description,
        }
      : {
          name: '',
          description: '',
        }
  );

  const onChange = (e) => {
    document.getElementById('editing').classList.remove('hidden');
    document.getElementById('submitted').classList.add('hidden');
    setStatus({ ...status, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (create) {
      addStatus(dispatch, status);
    } else {
      updateStatus(dispatch, statusToUpdate._id, status);
    }
    document.getElementById('editing').classList.add('hidden');
    document.getElementById('submitted').classList.remove('hidden');
    setTimeout(() => {
      history.push('/status');
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    if (!statusToUpdate) {
      history.push('/status');
    }
  }, [statusToUpdate, history]);

  return (
    <>
      {create && (
        <div id='editing'>
          <Alert variant='primary'>Create Status</Alert>
        </div>
      )}
      {!create && (
        <div id='editing'>
          <Alert variant='primary'>Update Status</Alert>
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
            value={status.name}
            placeholder='Status Name'
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={status.description}
            placeholder='Status Description'
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

export default StatusForm;
