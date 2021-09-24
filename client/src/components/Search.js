import { useState } from 'react';
import { Form, InputGroup, Jumbotron, Button } from 'react-bootstrap';

const Search = ({ searchTerm, dispatch, changeSearchTerm }) => {
  const [search, setSearch] = useState({ term: searchTerm });

  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changeSearchTerm(dispatch, search.term.trim());
  };
  const clearSearchTerm = () => {
    setSearch({ term: '' });
    changeSearchTerm(dispatch, '');
  };

  return (
    <Jumbotron>
      <Form inline onSubmit={onSubmit}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              {searchTerm ? (
                <i
                  className='fas fa-search-minus'
                  style={{ color: 'darkred', cursor: 'pointer' }}
                  onClick={clearSearchTerm}
                ></i>
              ) : (
                <i className='fas fa-search'></i>
              )}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            id='search-input'
            type='text'
            name='term'
            value={search.term}
            placeholder='Search for...'
            onChange={onChange}
            className='mr-sm-2'
          />
        </InputGroup>
        <Button variant='outline-success' type='submit' id='search-button'>
          Search
        </Button>
      </Form>
    </Jumbotron>
  );
};

export default Search;
