import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  //   blacklist: ["auth"],
};

let sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
