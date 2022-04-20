import { createStore, applyMiddleware } from "redux";
import ReduxPromise from 'redux-promise';
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const myStore = applyMiddleware(ReduxPromise)(createStore);

export default myStore(rootReducer, composeWithDevTools());