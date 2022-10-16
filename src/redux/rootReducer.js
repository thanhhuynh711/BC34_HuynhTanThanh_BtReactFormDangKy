import { combineReducers } from "redux";
import { createStore } from "redux";
import { NhanVienReducer } from "./Reducers/NhanVienReducer";

const rootReducer = combineReducers({
  NhanVienReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
