import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavigationBar = ({ token, username, admin, dispatch, logoutUser }) => {
  const onLogoutHandler = () => {
    if (window.confirm('Confirm User Sign Out')) {
      logoutUser(dispatch);
    }
  };

  return (
    <Navbar expand='lg' bg='dark' variant='dark'>
      <LinkContainer to='/'>
        <Navbar.Brand>Asset Manager</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse>
        <Nav className='mr-auto'>
          <LinkContainer to='/about'>
            <Nav.Link>
              <i className='fas fa-info-circle'></i> About
            </Nav.Link>
          </LinkContainer>
          {token && (
            <NavDropdown title='Manage'>
              <LinkContainer to='/assets'>
                <NavDropdown.Item>
                  <i className='fas fa-circle mr-2'></i> Assets
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to='/categories'>
                <NavDropdown.Item>
                  <i className='fas fa-globe mr-2'></i> Categories
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to='/locations'>
                <NavDropdown.Item>
                  <i className='fas fa-compass mr-2'></i> Locations
                </NavDropdown.Item>
              </LinkContainer>
              {admin && (
                <>
                  <NavDropdown.Divider />
                  <LinkContainer to='/users'>
                    <NavDropdown.Item>
                      <i className='fas fa-user-circle mr-2'></i> Users
                    </NavDropdown.Item>
                  </LinkContainer>
                </>
              )}
            </NavDropdown>
          )}
        </Nav>
        <Nav>
          <LinkContainer to='/userdata'>
            <Nav.Link>
              <div
                style={{
                  color: 'white',
                  display: token ? 'inline-block' : 'none',
                  background: admin ? 'red' : 'blue',
                  borderRadius: '5%',
                  padding: 2,
                  fontWeight: 'bold',
                }}
              >
                {username?.split(' ').map((x) => x.slice(0, 1).toUpperCase())}
              </div>
            </Nav.Link>
          </LinkContainer>
          {token ? (
            <Nav.Link onClick={onLogoutHandler}>
              <i className='fas fa-sign-out-alt'></i> Sign Out
            </Nav.Link>
          ) : (
            <LinkContainer to='/login'>
              <Nav.Link>
                Sign In <i className='fas fa-sign-in-alt'></i>
              </Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
