import { combineReducers } from "redux";
import auth from "./auth";
import records from "./records";

export default combineReducers({
  auth,
  records
});
