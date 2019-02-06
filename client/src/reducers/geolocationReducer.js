import { FETCH_GEOLOCATIONS } from "../actions/config";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_GEOLOCATIONS: {
      console.log(action.payload);
      return action.payload || "";
    }
    default:
      return state
  }
}