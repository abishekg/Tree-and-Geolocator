import { FETCH_TREE } from "../actions/config";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_TREE: {
      console.log(action.payload);
      return action.payload || "";
    }
    default:
      return state
  }
};
