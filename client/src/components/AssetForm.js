import { useState, useEffect } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

const AssetForm = ({
  create,
  categories,
  locations,
  dispatch,
  addAsset,
  history,
  assetToUpdate,
  updateAsset,
}) => {
  const [asset, setAsset] = useState(
    assetToUpdate
      ? {
          name: assetToUpdate.name,
          category: assetToUpdate.category._id ?? '610f2f4ea7115100151ea10e',
          location: assetToUpdate.location._id ?? '610f4ed1c40f480015e66f61',
          serialNumber: assetToUpdate.serialNumber,
          model: assetToUpdate.model,
          description: assetToUpdate.description,
          condition: assetToUpdate.condition,
        }
      : {
          name: '',
          description: '',
          category: '610f2f4ea7115100151ea10e', // hardcode a category id for assets with unassigned category
          location: '610f4ed1c40f480015e66f61', // hardcode a location id for assets with unassigned location
          serialNumber: '',
          model: '',
          description: '',
          condition: '',
        }
  );

  const onChange = (e) => {
    document.getElementById('editing').classList.remove('hidden');
    document.getElementById('submitted').classList.add('hidden');
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (create) {
      addAsset(dispatch, asset);
    } else {
      updateAsset(dispatch, assetToUpdate._id, asset);
    }
    document.getElementById('editing').classList.add('hidden');
    document.getElementById('submitted').classList.remove('hidden');
    setTimeout(() => {
      history.push('/assets');
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    if (!assetToUpdate) {
      history.push('/asset');
    }
  }, [assetToUpdate, history]);

  return (
    <>
      {create && (
        <div id='editing'>
          <Alert variant='primary'>Create Asset</Alert>
        </div>
      )}
      {!create && (
        <div id='editing'>
          <Alert variant='primary'>Update Asset</Alert>
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
            value={asset.name}
            placeholder='Asset Name'
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as='select'
            name='category'
            value={asset.category}
            onChange={onChange}
          >
            {categories?.map((x) => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            as='select'
            name='location'
            value={asset.location}
            onChange={onChange}
          >
            {locations?.map((x) => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Serial Number</Form.Label>
          <Form.Control
            type='text'
            name='serialNumber'
            value={asset.serialNumber}
            placeholder='Optional Serial Number'
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Model</Form.Label>
          <Form.Control
            type='text'
            name='model'
            value={asset.model}
            placeholder='Optional Model'
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={asset.description}
            placeholder='Asset Description'
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Condition</Form.Label>
          <Form.Control
            type='text'
            name='condition'
            value={asset.condition}
            placeholder='Optional Asset Condition'
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

export default AssetForm;
