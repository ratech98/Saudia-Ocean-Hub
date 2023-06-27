import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
