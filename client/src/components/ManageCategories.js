import { Link } from 'react-router-dom';
import { Alert, Table, Jumbotron, Button } from 'react-bootstrap';

import Loading from './Loading';
import Search from './Search';

const ManageCategories = ({
  categories,
  loading,
  error,
  dispatch,
  refreshAfterError,
  searchTerm,
  changeSearchTerm,
  deleteCategory,
}) => {
  const onDeleteHandler = (e) => {
    console.log(`delete category with id ${e.target.getAttribute('cat-id')}`);
    if (window.confirm('Confirm Category Deletion')) {
      deleteCategory(dispatch, e.target.getAttribute('cat-id'));
    }
  };

  const onRefreshHandler = () => {
    refreshAfterError(dispatch);
  };

  return (
    <div className='my-table'>
      <Jumbotron>
        <Link to='/category'>
          <Button variant='primary'>
            <i className='fas fa-plus'></i> Add New Category
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
                <th>Category</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories?.length === 0 ? (
                <tr>
                  <td colSpan='5'>No Categories Found</td>
                </tr>
              ) : (
                categories?.map((x, index) => {
                  return (
                    <tr key={x._id ? x._id : 'tempkey'}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/category/${x._id}`}>
                          <i className='far fa-edit'></i>
                        </Link>
                      </td>
                      <td>{x.name}</td>
                      <td>{x.description}</td>
                      <td>
                        <i
                          className='far fa-trash-alt'
                          cat-id={x._id}
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

export default ManageCategories;
