import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'react-redux';
import product from './reducers/product';

//combineReducers将多个reducers合并到一起
const rootReducer = combineReducers({
    product,
});

export default createStore(rootReducer,compose(applyMiddleware(...[thunk])));