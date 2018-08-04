import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import foods from './reducers/food';
import auth from './reducers/auth';

// const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  auth,
  foods,
}); 

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const middleware = compose(applyMiddleware(thunk, promise()), window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(reducer, middleware);
// const store = createStore(reducer, enhancer);

// sagaMiddleware.run(mySaga);

export default store;
