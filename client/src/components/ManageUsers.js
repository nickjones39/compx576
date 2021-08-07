import { Link } from 'react-router-dom';
import { Alert, Table, Jumbotron, Button } from 'react-bootstrap';

import Loading from './Loading';
import Search from './Search';

const ManageUsers = ({
  users,
  loading,
  error,
  dispatch,
  refreshAfterError,
  searchTerm,
  changeSearchTerm,
  deleteUser,
}) => {
  const onDeleteHandler = (e) => {
    console.log(`delete user with id ${e.target.getAttribute('user-id')}`);
    if (window.confirm('Confirm User Deletion')) {
      deleteUser(dispatch, e.target.getAttribute('user-id'));
    }
  };

  const onRefreshHandler = () => {
    refreshAfterError(dispatch);
  };

  return (
    <div className='my-table'>
      <Jumbotron>
        <Link to='/user'>
          <Button variant='primary'>
            <i className='fas fa-plus'></i> Add New User
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
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users?.length === 0 ? (
                <tr>
                  <td colSpan='6'>No Users Found</td>
                </tr>
              ) : (
                users?.map((x, index) => {
                  return (
                    <tr key={x._id ? x._id : 'tempkey'}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/user/${x._id}`}>
                          <i className='far fa-edit'></i>
                        </Link>
                      </td>
                      <td>{x.name}</td>
                      <td>{x.email}</td>
                      <td>{x.admin ? 'Admin' : 'User'}</td>
                      <td>
                        <i
                          className='far fa-trash-alt'
                          user-id={x._id}
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

export default ManageUsers;
