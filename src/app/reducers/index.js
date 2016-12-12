import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import template from './templateReducer';
import entities from './entityReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
    template,
    entities,
    routing
});

export default rootReducer;
