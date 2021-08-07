import { Alert, Accordion, Card, Button, Table } from 'react-bootstrap';

import Loading from './Loading';

const assetsByCat = (assets, cat) => {
  return assets.filter((asset) => asset.category?._id === cat._id);
};

const ByCategory = ({ assets, categories, loading, error }) => {
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant='danger'>
          {error.message ? error.message : 'An Error Occured'}
        </Alert>
      ) : (
        <Accordion>
          {categories.map((x) => (
            <Card key={x._id}>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey={x._id}>
                  {x.name}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={x._id}>
                {assetsByCat(assets, x).length === 0 ? (
                  <Card.Body>No assets found</Card.Body>
                ) : (
                  <Card.Body>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assetsByCat(assets, x).map((asset, index) => {
                          return (
                            <tr key={asset._id}>
                              <td>{index + 1}</td>
                              <td>{asset.name}</td>
                              <td>{asset.description}</td>
                              <td>{asset.location?.name}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Card.Body>
                )}
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default ByCategory;
