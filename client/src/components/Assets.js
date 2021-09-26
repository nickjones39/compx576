import { Table, Alert, Button } from 'react-bootstrap';

import Loading from './Loading';


const Assets = ({ dispatch, assets, loading, admin, error, refreshAfterError }) => {
  const onRefreshHandler = () => {
    refreshAfterError(dispatch);
  };

  return (
    <div className='my-table'>
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant='danger' className='refresh' onClick={onRefreshHandler}>
          {error.message ? error.message : 'An Error Occured'} - Click to
          refresh
         
        </Alert>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>category</th>
              <th>Location</th>
              <th>Leasee</th>
            </tr>
          </thead>
          <tbody>
            {assets?.length === 0 ? (
              <tr>
                <td colSpan='5'>Please sign-in to view assets</td>
              </tr>
            ) : (
              assets.map((asset, index) => {
                
                //let myUser = document.getElementById("userHack").innerHTML;
                //console.log("User ID: " + myUser);
                //console.log("Email : " + asset.assignedTo?.email);

                //if(asset.assignedTo?.email === myUser) {

                // asset.location?.name === "In Stock"
                // : (
                //  <td>{asset.assignedTo?.name}</td>
                //)

                  return (
                    <tr key={asset._id}>
                      <td>{index + 1}</td>
                      <td>{asset.name}</td>
                      <td>{asset.category?.name}</td>
                      <td>{asset.location?.name}</td>
                      {!admin && asset.location?.name === "In Stock" ? (
                          <td><Button as='input' type='submit' value='Request Asset' /></td>
                        ) : (
                          <td>{asset.assignedTo?.name}</td>
                        )
                      }
                    </tr>
                  );
                //}

              })
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Assets;
