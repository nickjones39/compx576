import { Link } from 'react-router-dom';
import { Alert, Table, Jumbotron, Button } from 'react-bootstrap';

import Loading from './Loading';
import Search from './Search';

const ManageLocations = ({
  locations,
  loading,
  error,
  dispatch,
  refreshAfterError,
  searchTerm,
  changeSearchTerm,
  deleteLocation,
}) => {
  const onDeleteHandler = (e) => {
    console.log(`delete location with id ${e.target.getAttribute('loc-id')}`);
    if (window.confirm('Confirm Location Deletion')) {
      deleteLocation(dispatch, e.target.getAttribute('loc-id'));
    }
  };

  const onRefreshHandler = () => {
    refreshAfterError(dispatch);
  };

  return (
    <div className='my-table'>
      <Jumbotron>
        <Link to='/location'>
          <Button variant='primary'>
            <i className='fas fa-plus'></i> Add New Location
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
                <th>Location</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {locations?.length === 0 ? (
                <tr>
                  <td colSpan='5'>No Locations Found</td>
                </tr>
              ) : (
                locations?.map((x, index) => {
                  return (
                    <tr key={x._id ? x._id : 'tempkey'}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/location/${x._id}`}>
                          <i className='far fa-edit'></i>
                        </Link>
                      </td>
                      <td>{x.name}</td>
                      <td>{x.description}</td>
                      <td>
                        <i
                          className='far fa-trash-alt'
                          loc-id={x._id}
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

export default ManageLocations;
