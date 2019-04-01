
import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from '../reduces/index'

const loggerMiddleware = createLogger({
  collapsed: true   // 可以让action折叠，看着舒服点吧
})

const middleware = [thunk, loggerMiddleware];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store
