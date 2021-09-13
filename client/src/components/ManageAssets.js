import { Link } from 'react-router-dom';
import { Alert, Table, Jumbotron, Button } from 'react-bootstrap';

import Loading from './Loading';
import Search from './Search';

const ManageAssets = ({
  assets,
  loading,
  error,
  dispatch,
  refreshAfterError,
  searchTerm,
  changeSearchTerm,
  deleteAsset,
}) => {
  const onDeleteHandler = (e) => {
    console.log(`delete asset with id ${e.target.getAttribute('asset-id')}`);
    if (window.confirm('Confirm Asset Deletion')) {
      deleteAsset(dispatch, e.target.getAttribute('asset-id'));
    }
  };

  const onRefreshHandler = () => {
    refreshAfterError(dispatch);
  };

  return (
    <div className='my-table'>
      <Jumbotron>
        <Link to='/asset'>
          <Button variant='primary'>
            <i className='fas fa-plus'></i> Add New Asset
          </Button>
        </Link>
      </Jumbotron>
      <Search
        searchTerm={searchTerm}
        changeSearchTerm={changeSearchTerm}
        dispatch={dispatch}
      />
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant='danger' className='refresh' onClick={onRefreshHandler}>
          {error.message ? error.message : 'An Error Occured'} - Click to
          refresh
        </Alert>
      ) : (
        <>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>Asset</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {assets?.length === 0 ? (
                <tr>
                  <td colSpan='5'>No Assets Found</td>
                </tr>
              ) : (
                assets?.map((asset, index) => {
                  return (
                    <tr key={asset._id ? asset._id : 'tempkey'}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/asset/${asset._id}`}>
                          <i className='far fa-edit'></i>
                        </Link>
                      </td>
                      <td>{asset.name}</td>
                      <td>{asset.description}</td>
                      <td>
                        <i
                          className='far fa-trash-alt'
                          asset-id={asset._id}
                          onClick={onDeleteHandler}
                          style={{ color: 'darkred', cursor: 'pointer' }}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default ManageAssets;
