import { Table, Alert } from 'react-bootstrap';

import Loading from './Loading';

const Assets = ({ dispatch, assets, loading, error, refreshAfterError }) => {
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
              <th>Description</th>
              <th>Category</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {assets?.length === 0 ? (
              <tr>
                <td colSpan='5'>No Assets Found</td>
              </tr>
            ) : (
              assets.map((asset, index) => {
                return (
                  <tr key={asset._id}>
                    <td>{index + 1}</td>
                    <td>{asset.name}</td>
                    <td>{asset.description}</td>
                    <td>{asset.category?.name}</td>
                    <td>{asset.location?.name}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Assets;
