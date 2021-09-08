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
          category: assetToUpdate.category._id ?? '61171936a9e02900161fb08a',
          location: assetToUpdate.location._id ?? '611718e8a9e02900161fb086', // 610f4ed1c40f480015e66f61
          assignedTo: assetToUpdate.assignedTo._id ?? '',  // default is not assigned
          serialNumber: assetToUpdate.serialNumber,
          model: assetToUpdate.model,
          description: assetToUpdate.description,
          condition: assetToUpdate.condition,
        }
      : {
          name: '',
          category: '61171936a9e02900161fb08a', // hardcode a category id for assets with unassigned category
          location: '611718e8a9e02900161fb086', // hardcode a location id for assets with unassigned location 610f4ed1c40f480015e66f61
          assignedTo: '',                       // default is not assigned
          serialNumber: '',
          model: '',
          description: '',
          condition: '',
        }

  );

  


  const onChange = (e) => {


    if(e.target.name === "location") {
      if (e.target.value === "611718f1a9e02900161fb087") {
        document.getElementById('assignedUser').style.visibility = 'visible';
        document.getElementById('assignedUser').style.display = 'block';
      } else {
        document.getElementById('setAssignedTo').value = '';
        document.getElementById('setAssignedTo').selectedIndex = 0;
        document.getElementById('assignedUser').style.visibility = 'hidden';
        document.getElementById('assignedUser').style.display = 'none';
        setAsset({ ...asset, [assetToUpdate.assignedTo]: '' });
        console.log(assetToUpdate.assignedTo);
      }
    }

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

  function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
       return 0;  
    }  
 }

  const jsonObj = document.getElementById("usersHack").innerHTML;
  let usersList = JSON.parse(jsonObj);
  
  usersList.sort(sortByProperty("name"));

  const onLoad = (e) => {
      alert(assetToUpdate.assignedTo);
      if(assetToUpdate.assignedTo != '') {
        document.getElementById('assignedUser').style.visibility = 'visible';
        document.getElementById('assignedUser').style.display = 'block';
        document.getElementById('setAssignedTo').selectedIndex = assetToUpdate.assignedTo;
      }
  };

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
      <Form onSubmit={onSubmit} onLoad={onLoad}>
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


        <div id="assignedUser">
          <Form.Group>
              <Form.Label>Assigned to</Form.Label>
              <Form.Control
                  id="setAssignedTo"
                  as='select'
                  name='assignedTo'
                  value={asset.assignedTo}
                  onChange={onChange}
              >
                  <option value="">-- Please select user to assign asset to --</option>
                  {usersList?.map((x) => (
                  <option key={x._id} value={x._id}>
                      {x.name}
                  </option>
                  ))}
              </Form.Control>
          </Form.Group>
        </div>


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
          <Form.Label>Asset ID</Form.Label>
          <Form.Control
            type='text'
            name='assetId'
            value={asset.assetId}
            placeholder='Optional Asset ID'
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
