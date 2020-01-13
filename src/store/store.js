import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import dropdownReducers from "./Reducers/dropdownReducers";
import loginReducers from "./Reducers/loginReducers";
import dataReducers from "./Reducers/dataReducers";
import companyReducers from "./Reducers/companiesReducer";
import supplierReducer from "./Reducers/supplierReducer";
import customerReducer from "./Reducers/customerReducer";

import productReducers from "./Reducers/productReducer";
import userReducer from "./Reducers/userReducer";
import categoryReducers from "./Reducers/categoryReducers";
import areaReducers from "./Reducers/areas";
import salesReducer from "./Reducers/salesReducer";
import purchaseReducer from "./Reducers/purchaseReducer";
import expensesReducer from "./Reducers/expensesReducer";
import storeReducer from "./Reducers/storeReducer";

import attendanceReducer from "./Reducers/attendanceReducer";

const persistConfig = {
  key: "root",
  storage
  // whitelist: ["dropdownReducers"]
};
const middleware = [thunk];

let allStore = combineReducers({
  attendanceReducer,
  storeReducer,
  expensesReducer,
  purchaseReducer,
  salesReducer,
  areaReducers,
  categoryReducers,
  customerReducer,
  supplierReducer,
  dropdownReducers,
  loginReducers,
  dataReducers,
  productReducers,
  userReducer,
  companyReducers
});

const persistedReducer = persistReducer(persistConfig, allStore);
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
window.store = createStore(persistedReducer);
export const persistor = persistStore(store);
