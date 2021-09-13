import { Alert, Accordion, Card, Button, Table } from 'react-bootstrap';

import Loading from './Loading';

const assetsByLoc = (assets, loc) => {
  return assets.filter((asset) => asset.location?._id === loc._id);
};

const ByLocation = ({ assets, locations, loading, error }) => {
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
          {locations.map((x) => (
            <Card key={x._id}>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey={x._id}>
                  {x.name}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={x._id}>
                {assetsByLoc(assets, x).length === 0 ? (
                  <Card.Body>No locations found</Card.Body>
                ) : (
                  <Card.Body>
                    <Table responsive>


                      <thead>
                        <tr>
                          <th>#</th>
                          <th></th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Category</th>
                          <th>Leasee</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assetsByLoc(assets, x).map((asset, index) => {
                          return (
                            <tr key={asset._id}>
                              <td>{index + 1}</td>
                              <td>
                                <Link to={'/asset/${asset._id}'}>
                                  <i className='far fa-edit'></i>
                                </Link>
                              </td>
                              <td>{asset.name}</td>
                              <td>{asset.description}</td>
                              <td>{asset.category?.name}</td>
                              <td>{asset.assignedTo?.name}</td>
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

export default ByLocation;
