import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import template from './templateReducer';
import entities from './entityReducer';
import modal from './modalReducer';

/**
 * Combine reducers
 */
const rootReducer = combineReducers({
    template,
    entities,
    modal,
    routing
});

export default rootReducer;
