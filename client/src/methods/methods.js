import axios from 'axios';
import jwt from 'jsonwebtoken';

const LIMIT = 10;

export const setPage = (dispatch, page) => {
  dispatch({ type: 'set-page', page });
};

export const changeSearchTerm = (dispatch, term) => {
  dispatch({ type: 'change-search-term', searchTerm: term, page: 1 });
};

export const changeCategorySearchTerm = (dispatch, term) => {
  dispatch({ type: 'change-category-search-term', categorySearchTerm: term });
};

export const changeLocationSearchTerm = (dispatch, term) => {
  dispatch({
    type: 'change-location-search-term',
    locationSearchTerm: term,
  });
};

export const changeUserSearchTerm = (dispatch, term) => {
  dispatch({
    type: 'change-user-search-term',
    userSearchTerm: term,
  });
};

export const fetchAssets = async (dispatch) => {
  try {
    dispatch({ type: 'fetch-assets-request', loading: true });
    const { data } = await axios.get('/api/assets');
    console.log('in fetchAssets - data.data is:', data.data);
    dispatch({ type: 'fetch-assets-ok', assets: data.data, loading: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-assets-fail', loading: false, error });
  }
};

export const fetchFilteredAssets = async (dispatch, term, page) => {
  try {
    dispatch({ type: 'fetch-filtered-assets-request', loading: true });
    const { data } = await axios.get(
      `/api/assets?search=${term}&page=${page}&limit=${LIMIT}`
    );
    console.log('in fetchFilteredAssets - data.data is:', data.data);
    dispatch({
      type: 'fetch-filtered-assets-ok',
      filteredAssets: data.data,
      loading: false,
    });
    dispatch({
      type: 'set-number-of-pages',
      numberOfPages: Math.ceil(data.filtered / data.limit),
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-filtered-assets-fail', loading: false, error });
  }
};

export const fetchCategories = async (dispatch) => {
  try {
    dispatch({ type: 'fetch-categories-request', loading: true });
    const { data } = await axios.get('/api/categories');
    console.log('in fetchCategories - data.data is:', data.data);
    dispatch({
      type: 'fetch-categories-ok',
      categories: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-categories-fail', loading: false, error });
  }
};

export const fetchFilteredCategories = async (dispatch, term) => {
  try {
    dispatch({ type: 'fetch-filtered-categories-request', loading: true });
    const { data } = await axios.get(`/api/categories?search=${term}`);
    console.log('in fetchFilteredCategories - data.data is:', data.data);
    dispatch({
      type: 'fetch-filtered-categories-ok',
      filteredCategories: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-filtered-categories-fail', loading: false, error });
  }
};

export const fetchLocations = async (dispatch) => {
  try {
    dispatch({ type: 'fetch-loacations-request', loading: true });
    const { data } = await axios.get('/api/locations');
    console.log('in fetchLocations - data.data is:', data.data);
    dispatch({
      type: 'fetch-locations-ok',
      locations: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-locations-fail', loading: false, error });
  }
};

export const fetchFilteredLocations = async (dispatch, term) => {
  try {
    dispatch({ type: 'fetch-filtered-locations-request', loading: true });
    const { data } = await axios.get(`/api/locations?search=${term}`);
    console.log('in fetchFilteredLocations - data.data is:', data.data);
    dispatch({
      type: 'fetch-filtered-locations-ok',
      filteredLocations: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-filtered-locations-fail', loading: false, error });
  }
};

export const fetchFilteredUsers = async (dispatch, term) => {
  try {
    dispatch({ type: 'fetch-filtered-users-request', loading: true });
    const { data } = await axios.get(`/api/users?search=${term}`);
    console.log('in fetchFilteredUsers - data.data is:', data.data);
    dispatch({
      type: 'fetch-filtered-users-ok',
      filteredUsers: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'fetch-filtered-users-fail', loading: false, error });
  }
};

export const refreshAfterError = (dispatch) => {
  dispatch({ type: 'refresh-after-error', error: null });
};

export const addAsset = async (dispatch, postData) => {
  try {
    dispatch({ type: 'add-asset-request', loading: true });
    const { data } = await axios.post('/api/assets', postData);
    console.log('in addAsset - data.data is:', data.data);
    dispatch({ type: 'add-asset-ok', newAsset: data.data, loading: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'add-asset-fail', loading: false, error });
  }
};

export const updateAsset = async (dispatch, id, postData) => {
  try {
    dispatch({ type: 'update-asset-request', loading: true });
    const { data } = await axios.patch(`/api/assets/${id}`, postData);
    console.log('in updateAsset - data.data is:', data.data);
    dispatch({
      type: 'update-asset-ok',
      updatedAsset: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'update-asset-fail', loading: false, error });
  }
};

export const deleteAsset = async (dispatch, id) => {
  try {
    dispatch({ type: 'delete-asset-request', loading: true });
    await axios.delete(`/api/assets/${id}`);
    dispatch({ type: 'delete-asset-ok', deletedId: id, loading: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'delete-asset-fail', loading: false, error });
  }
};

export const addCategory = async (dispatch, postData) => {
  try {
    dispatch({ type: 'add-category-request', loading: true });
    const { data } = await axios.post('/api/categories', postData);
    console.log('in addCategory - data.data is:', data.data);
    dispatch({
      type: 'add-category-ok',
      newCategory: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'add-category-fail', loading: false, error });
  }
};

export const updateCategory = async (dispatch, id, postData) => {
  try {
    dispatch({ type: 'update-category-request', loading: true });
    const { data } = await axios.patch(`/api/categories/${id}`, postData);
    console.log('in updateCategory - data.data is:', data.data);
    dispatch({
      type: 'update-category-ok',
      updatedCategory: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'update-category-fail', loading: false, error });
  }
};

export const deleteCategory = async (dispatch, id) => {
  try {
    dispatch({ type: 'delete-category-request', loading: true });
    await axios.delete(`/api/categories/${id}`);
    dispatch({ type: 'delete-category-ok', deletedId: id, loading: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'delete-category-fail', loading: false, error });
  }
};

export const addLocation = async (dispatch, postData) => {
  try {
    dispatch({ type: 'add-location-request', loading: true });
    const { data } = await axios.post('/api/locations', postData);
    console.log('in addLocation - data.data is:', data.data);
    dispatch({
      type: 'add-location-ok',
      newLocation: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'add-location-fail', loading: false, error });
  }
};

export const updateLocation = async (dispatch, id, postData) => {
  try {
    dispatch({ type: 'update-location-request', loading: true });
    const { data } = await axios.patch(`/api/locations/${id}`, postData);
    console.log('in updateLocation - data.data is:', data.data);
    dispatch({
      type: 'update-location-ok',
      updatedLocation: data.data,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'update-location-fail', loading: false, error });
  }
};

export const deleteLocation = async (dispatch, id) => {
  try {
    dispatch({ type: 'delete-location-request', loading: true });
    await axios.delete(`/api/locations/${id}`);
    dispatch({ type: 'delete-location-ok', deletedId: id, loading: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'delete-location-fail', loading: false, error });
  }
};

export const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export const loginUser = async (dispatch, postData) => {
  try {
    dispatch({ type: 'login-user-request', loading: true });
    const { data } = await axios.post('/api/users/login', postData);
    console.log('in loginUser - data.token is:', data.token);
    const tokenData = jwt.decode(data.token);
    dispatch({
      type: 'login-user-ok',
      token: data.token,
      loggedUserId: tokenData.id,
      username: tokenData.name,
      admin: tokenData.admin,
      loading: false,
    });
    setToken(data.token);
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'login-user-fail',
      loading: false,
      token: null,
      loggedUserId: null,
      username: null,
      admin: null,
      error: { message: 'Login failed' },
    });
    setToken(null);
  }
};

export const logoutUser = async (dispatch) => {
  try {
    dispatch({ type: 'logout-user-request', loading: true });
    dispatch({
      type: 'logout-user-ok',
      token: null,
      loggedUserId: null,
      username: null,
      admin: null,
      loading: false,
    });
    setToken(null);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'logout-user-fail', loading: false, error });
    setToken(null);
  }
};

export const changeUserPassword = async (dispatch, userId, newPassword) => {
  try {
    dispatch({ type: 'change-user-password-request', loading: true });
    const { data } = await axios.patch(
      `/api/users/changeownpassword/${userId}`,
      { password: newPassword }
    );
    console.log('in changeUserPassword - data.msg is:', data.msg);
    dispatch({
      type: 'change-user-password-ok',
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'change-user-password-fail', loading: false, error });
  }
};

export const addUser = async (dispatch, postData) => {
  try {
    dispatch({ type: 'add-user-request', loading: true });
    const { data } = await axios.post('/api/users', postData);
    console.log('in addUser - data.token is:', data.token);
    const newUser = { ...postData, _id: jwt.decode(data.token).id };
    dispatch({
      type: 'add-user-ok',
      newUser,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'add-user-fail', loading: false, error });
  }
};

export const updateUser = async (dispatch, id, userData) => {
  try {
    dispatch({ type: 'update-user-request', loading: true });
    const postData = {
      name: userData.name,
      admin: userData.admin,
    };
    const { data } = await axios.patch(`/api/users/${id}`, postData);
    console.log('in updateUser - data.token is:', data.token);
    const updatedUser = { ...userData, _id: jwt.decode(data.token).id };
    dispatch({
      type: 'update-user-ok',
      updatedUser,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'update-user-fail', loading: false, error });
  }
};

export const deleteUser = async (dispatch, id) => {
  try {
    dispatch({ type: 'delete-user-request', loading: true });
    await axios.delete(`/api/users/${id}`);
    dispatch({ type: 'delete-user-ok', deletedId: id, loading: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'delete-user-fail', loading: false, error });
  }
};
