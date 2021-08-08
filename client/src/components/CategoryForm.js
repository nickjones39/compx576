import { useState, useEffect } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

const CategoryForm = ({
  create,
  dispatch,
  addCategory,
  history,
  categoryToUpdate,
  updateCategory,
}) => {
  const [category, setCategory] = useState(
    categoryToUpdate
      ? {
          name: categoryToUpdate.name,
          description: categoryToUpdate.description,
        }
      : {
          name: '',
          description: '',
        }
  );

  const onChange = (e) => {
    document.getElementById('editing').classList.remove('hidden');
    document.getElementById('submitted').classList.add('hidden');
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (create) {
      addCategory(dispatch, category);
    } else {
      updateCategory(dispatch, categoryToUpdate._id, category);
    }
    document.getElementById('editing').classList.add('hidden');
    document.getElementById('submitted').classList.remove('hidden');
    setTimeout(() => {
      history.push('/categories');
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    if (!categoryToUpdate) {
      history.push('/category');
    }
  }, [categoryToUpdate, history]);

  return (
    <>
      {create && (
        <div id='editing'>
          <Alert variant='primary'>Create Category</Alert>
        </div>
      )}
      {!create && (
        <div id='editing'>
          <Alert variant='primary'>Update Category</Alert>
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
            value={category.name}
            placeholder='Category Name'
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={category.description}
            placeholder='Category Description'
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

export default CategoryForm;
