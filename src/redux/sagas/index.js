import { authSaga } from "./authSaga";
import { dashboardSaga } from "./dashboardSaga";
import { all } from "redux-saga/effects";

const root = function* root() {
  yield all([authSaga(), dashboardSaga()]);
};

export default root;
