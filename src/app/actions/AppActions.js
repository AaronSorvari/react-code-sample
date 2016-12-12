import { normalize, arrayOf } from 'normalizr';
import ActionTypes from '../constants/ActionTypes';
import WebAPIUtils from '../utils/WebAPIUtils';
import WebAPISchema from '../utils/WebAPISchema';

/**
 * App actions
 *
 * @type {Object}
 */
const AppActions = {
    /**
     * App initialize action
     *
     * @return {Object}
     */
    initialize(entities) {
        return {
            type: ActionTypes.INITIALIZE,
            entities
        };
    },

    initializeAsync() {
        return function thunk(dispatch) {
            return WebAPIUtils.getBoardData().then((boardArray) => {
                const normalizedData = normalize(boardArray, arrayOf(WebAPISchema.board));
                dispatch(AppActions.initialize(normalizedData.entities));
            });
        };
    },

    /**
     * Placeholder action (example)
     *
     * @param  {number} inc increment value
     *
     * @return {Object}
     */
    placeholder(inc) {
        return {
            type: ActionTypes.PLACEHOLDER,
            inc
        };
    },

    /**
     * Example of async action
     *
     * @param  {number} inc increment value
     *
     * @return {Function}
     */
    placeholderAsync(inc) {
        return function thunk(dispatch) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    dispatch(AppActions.placeholder(inc));
                    resolve();
                }, 500);
            });
        };
    }
};

export default AppActions;
