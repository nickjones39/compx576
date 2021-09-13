import { Table, Alert } from 'react-bootstrap';

import Loading from './Loading';



const Assets = ({ dispatch, assets, loading, error, refreshAfterError }) => {
  const onRefreshHandler = () => {
    refreshAfterError(dispatch);   
  };

 
  window.location.href = "https://compx576.herokuapp.com/";
  

  return (
    <div className='my-table'>
      {loading ? (
        <Loading />
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
                  return (
                    <tr key={asset._id}>
                      <td>{index + 1}</td>
                      <td>{asset.name}</td>
                      <td>{asset.category?.name}</td>
                      <td>{asset.location?.name}</td>
                      <td>{asset.assignedTo?.name}</td>
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
