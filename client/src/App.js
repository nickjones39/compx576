import { useReducer, useEffect } from 'react';
import { Container, Tabs, Tab, Jumbotron, Alert } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import reducer from './reducers/reducer';

import NavigationBar from './components/NavigationBar';
import NotFound from './components/NotFound';
import About from './components/About';
import Assets from './components/Assets';
import ByCategory from './components/ByCategory';
import ByStatus from './components/ByStatus';
import Search from './components/Search';
import PaginationButtons from './components/PaginationButtons';
import ManageAssets from './components/ManageAssets';
import AssetForm from './components/AssetForm';
import ManageCategories from './components/ManageCategories';
import CategoryForm from './components/CategoryForm';
import ManageStatuses from './components/ManageStatuses';
import StatusForm from './components/StatusForm';
import LoginForm from './components/LoginForm';
import UserData from './components/UserData';
import ManageUsers from './components/ManageUsers';
import UserForm from './components/UserForm';

import {
  fetchAssets,
  fetchCategories,
  fetchStatuses,
  refreshAfterError,
  fetchFilteredAssets,
  changeSearchTerm,
  setPage,
  addAsset,
  updateAsset,
  deleteAsset,
  fetchFilteredCategories,
  changeCategorySearchTerm,
  addCategory,
  updateCategory,
  deleteCategory,
  fetchFilteredStatuses,
  changeStatusSearchTerm,
  addStatus,
  updateStatus,
  deleteStatus,
  setToken,
  loginUser,
  logoutUser,
  changeUserPassword,
  fetchFilteredUsers,
  changeUserSearchTerm,
  addUser,
  updateUser,
  deleteUser,
} from './methods/methods';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    assets: [],
    categories: [],
    statuses: [],
    loading: true,
    error: null,
    searchTerm: '',
    filteredAssets: [],
    numberOfPages: 1,
    page: 1,
    categorySearchTerm: '',
    filteredCategories: [],
    statusSearchTerm: '',
    filteredStatuses: [],
    token: localStorage.getItem('token'),
    loggedUserId: jwt.decode(localStorage.getItem('token'))?.id,
    username: jwt.decode(localStorage.getItem('token'))?.name,
    admin: jwt.decode(localStorage.getItem('token'))?.admin,
    filteredUsers: [],
    userSearchTerm: '',
  });

  setToken(state.token); // set headers again after page reloads

  useEffect(() => {
    fetchAssets(dispatch);
    fetchCategories(dispatch);
    fetchStatuses(dispatch);
  }, []);

  useEffect(() => {
    fetchFilteredAssets(dispatch, state.searchTerm, state.page);
  }, [state.searchTerm, state.page]);

  useEffect(() => {
    fetchFilteredCategories(dispatch, state.categorySearchTerm);
  }, [state.categorySearchTerm]);

  useEffect(() => {
    fetchFilteredStatuses(dispatch, state.statusSearchTerm);
  }, [state.statusSearchTerm]);

  useEffect(() => {
    if (state.admin) {
      fetchFilteredUsers(dispatch, state.userSearchTerm);
    }
  }, [state.userSearchTerm, state.admin]);

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar
          token={state.token}
          username={state.username}
          admin={state.admin}
          dispatch={dispatch}
          logoutUser={logoutUser}
        />
        <Switch>
          <Route path='/about' component={About} />

          <Route exact path='/'>
            <Tabs defaultActiveKey='assets' id='tabs'>
              <Tab eventKey='assets' title='Assets'>
                <Search
                  searchTerm={state.searchTerm}
                  dispatch={dispatch}
                  changeSearchTerm={changeSearchTerm}
                />
                <Assets
                  assets={state.filteredAssets}
                  loading={state.loading}
                  error={state.error}
                  dispatch={dispatch}
                  refreshAfterError={refreshAfterError}
                />
                <Jumbotron>
                  <PaginationButtons
                    numberOfPages={state.numberOfPages}
                    page={state.page}
                    setPage={setPage}
                    dispatch={dispatch}
                  />
                </Jumbotron>
              </Tab>
              <Tab eventKey='by-category' title='ByCategory'>
                <ByCategory
                  assets={state.assets}
                  categories={state.categories}
                  loading={state.loading}
                  error={state.error}
                />
              </Tab>
              <Tab eventKey='by-status' title='ByStatus'>
                <ByStatus
                  assets={state.assets}
                  statuses={state.statuses}
                  loading={state.loading}
                  error={state.error}
                />
              </Tab>
            </Tabs>
          </Route>

          <Route path='/assets'>
            {state.token ? (
              <>
                <ManageAssets
                  assets={state.filteredAssets}
                  loading={state.loading}
                  error={state.error}
                  dispatch={dispatch}
                  refreshAfterError={refreshAfterError}
                  searchTerm={state.searchTerm}
                  changeSearchTerm={changeSearchTerm}
                  deleteAsset={deleteAsset}
                />
                <Jumbotron>
                  <PaginationButtons
                    numberOfPages={state.numberOfPages}
                    page={state.page}
                    setPage={setPage}
                    dispatch={dispatch}
                  />
                </Jumbotron>
              </>
            ) : (
              <Alert variant='danger'>401 Not Authorized</Alert>
            )}
          </Route>

          <Route
            path='/asset'
            exact
            render={(props) =>
              state.token ? (
                <AssetForm
                  {...props}
                  create={true}
                  categories={state.categories}
                  statuses={state.statuses}
                  dispatch={dispatch}
                  addAsset={addAsset}
                />
              ) : (
                <Alert variant='danger'>401 Not Authorized</Alert>
              )
            }
          />

          <Route
            path='/asset/:id'
            render={(props) =>
              state.token ? (
                <AssetForm
                  {...props}
                  create={false}
                  assetToUpdate={state.assets.find(
                    (x) => x._id === props.match.params.id
                  )}
                  categories={state.categories}
                  statuses={state.statuses}
                  dispatch={dispatch}
                  updateAsset={updateAsset}
                />
              ) : (
                <Alert variant='danger'>401 Not Authorized</Alert>
              )
            }
          />

          <Route path='/categories'>
            {state.token ? (
              <ManageCategories
                categories={state.filteredCategories}
                loading={state.loading}
                error={state.error}
                dispatch={dispatch}
                refreshAfterError={refreshAfterError}
                searchTerm={state.categorySearchTerm}
                changeSearchTerm={changeCategorySearchTerm}
                deleteCategory={deleteCategory}
              />
            ) : (
              <Alert variant='danger'>401 Not Authorized</Alert>
            )}
          </Route>

          <Route
            path='/category'
            exact
            render={(props) =>
              state.token ? (
                <CategoryForm
                  {...props}
                  create={true}
                  dispatch={dispatch}
                  addCategory={addCategory}
                />
              ) : (
                <Alert variant='danger'>401 Not Authorized</Alert>
              )
            }
          />

          <Route
            path='/category/:id'
            render={(props) =>
              state.token ? (
                <CategoryForm
                  {...props}
                  create={false}
                  categoryToUpdate={state.categories.find(
                    (x) => x._id === props.match.params.id
                  )}
                  dispatch={dispatch}
                  updateCategory={updateCategory}
                />
              ) : (
                <Alert variant='danger'>401 Not Authorized</Alert>
              )
            }
          />

          <Route path='/statuses'>
            {state.token ? (
              <ManageStatuses
                statuses={state.filteredStatuses}
                loading={state.loading}
                error={state.error}
                dispatch={dispatch}
                refreshAfterError={refreshAfterError}
                searchTerm={state.statusSearchTerm}
                changeSearchTerm={changeStatusSearchTerm}
                deleteStatus={deleteStatus}
              />
            ) : (
              <Alert variant='danger'>401 Not Authorized</Alert>
            )}
          </Route>

          <Route
            path='/status'
            exact
            render={(props) =>
              state.token ? (
                <StatusForm
                  {...props}
                  create={true}
                  dispatch={dispatch}
                  addStatus={addStatus}
                />
              ) : (
                <Alert variant='danger'>401 Not Authorized</Alert>
              )
            }
          />

          <Route
            path='/status/:id'
            render={(props) =>
              state.token ? (
                <StatusForm
                  {...props}
                  create={false}
                  statusToUpdate={state.statuses.find(
                    (x) => x._id === props.match.params.id
                  )}
                  dispatch={dispatch}
                  updateStatus={updateStatus}
                />
              ) : (
                <Alert variant='danger'>401 Not Authorized</Alert>
              )
            }
          />

          <Route
            path='/login'
            exact
            render={(props) => (
              <LoginForm {...props} dispatch={dispatch} loginUser={loginUser} />
            )}
          />

          <Route
            path='/userdata'
            exact
            render={(props) =>
              state.token ? (
                <UserData
                  {...props}
                  error={state.error}
                  username={state.username}
                  loggedUserId={state.loggedUserId}
                  dispatch={dispatch}
                  changeUserPassword={changeUserPassword}
                />
              ) : (
                <Alert variant='danger'>401 Not Authorized</Alert>
              )
            }
          />

          <Route path='/users'>
            {state.admin ? (
              <ManageUsers
                users={state.filteredUsers}
                loading={state.loading}
                error={state.error}
                dispatch={dispatch}
                refreshAfterError={refreshAfterError}
                searchTerm={state.userSearchTerm}
                changeSearchTerm={changeUserSearchTerm}
                deleteUser={deleteUser}
              />
            ) : (
              <Alert variant='danger'>401 Not Authorized</Alert>
            )}
          </Route>

          <Route
            path='/user'
            exact
            render={(props) =>
              state.admin ? (
                <UserForm
                  {...props}
                  create={true}
                  dispatch={dispatch}
                  addUser={addUser}
                />
              ) : (
                <Alert variant='danger'>401 Not Authorized</Alert>
              )
            }
          />

          <Route
            path='/user/:id'
            render={(props) =>
              state.admin ? (
                <UserForm
                  {...props}
                  create={false}
                  userToUpdate={state.filteredUsers.find(
                    (x) => x._id === props.match.params.id
                  )}
                  dispatch={dispatch}
                  updateUser={updateUser}
                />
              ) : (
                <Alert variant='danger'>401 Not Authorized</Alert>
              )
            }
          />

          <Route path='/*' component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
