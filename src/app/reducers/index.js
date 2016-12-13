import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import entities from './entityReducer';
import modal from './modalReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
    entities,
    modal,
    routing
});

export default rootReducer;
