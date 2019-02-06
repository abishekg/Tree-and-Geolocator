import { combineReducers } from 'redux';
import nodeReducer from './nodeReducer';
import geolocationReducer from './geolocationReducer';
import { reducer } from 'redux-form';
import infiniteloopReducer from './infiniteloopReducer';
import geolocations from './geolocations';

export default combineReducers({
  node: nodeReducer,
  bounds: geolocationReducer,
  grids: infiniteloopReducer,
  form: reducer
});