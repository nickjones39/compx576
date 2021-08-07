import { Pagination } from 'react-bootstrap';

const PaginationButtons = ({ numberOfPages, page, setPage, dispatch }) => {
  const buttons = [];
  for (let i = 0; i < numberOfPages; i++) {
    buttons.push(i + 1);
  }

  return (
    <Pagination>
      {!numberOfPages && <Pagination.Item active>0</Pagination.Item>}

      {page > 2 && <Pagination.First onClick={() => setPage(dispatch, 1)} />}

      {buttons.map((x, i) =>
        x === page ? (
          <Pagination.Item active key={i}>
            {x}
          </Pagination.Item>
        ) : (
          ((x < page && x > page - 3) || (x > page && x < page + 3)) && (
            <Pagination.Item key={i} onClick={() => setPage(dispatch, x)}>
              {x}
            </Pagination.Item>
          )
        )
      )}

      {page < numberOfPages - 1 && (
        <Pagination.Last
          onClick={() => {
            setPage(dispatch, numberOfPages);
          }}
        />
      )}
    </Pagination>
  );
};

export default PaginationButtons;
