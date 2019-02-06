import { FETCH_GRID } from "../actions/config";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_GRID: {
      console.log(action.payload);
      return action.payload || "";
    }
    default:
      return state
  }
}