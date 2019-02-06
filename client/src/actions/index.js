import axios from 'axios';
import { ROOT_URL, FETCH_TREE, FETCH_GEOLOCATIONS, SUBMIT_FORM, FETCH_GRID } from './config';

export const fetchTree = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/fetchnode`);
  console.log('res: ', JSON.stringify(res.data));
  dispatch({ type: FETCH_TREE, payload: (res.data) });
}

export const fetchGeolocations = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/getval`);
  console.log('res: ', res);
  dispatch({ type: FETCH_GEOLOCATIONS, payload: (res.data) });
}

export const submitForm = (values, callback) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/submitForm`, values).then(() => callback());
  return { type: SUBMIT_FORM, payload: res };
}


export const fetchGrid = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/fetch`);
  console.log('ACTION res: ', res);
  dispatch({ type: FETCH_GRID, payload: res.data });
}