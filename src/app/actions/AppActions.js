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

    addBoardAsync({ boardName }) {
        return function thunk(dispatch) {
            return WebAPIUtils.addBoard({ boardName }).then((result) => {
                // Quick implementation: reload all data
                // TODO: Only update the data that changed
                dispatch(AppActions.initializeAsync());
            });
        };
    },

    addColumnToBoardAsync({ boardId, columnLabel }) {
        return function thunk(dispatch) {
            return WebAPIUtils.addColumnToBoard({ boardId, columnLabel }).then((result) => {
                // Quick implementation: reload all data
                // TODO: Only update the data that changed
                dispatch(AppActions.initializeAsync());
            });
        };
    },

    addCardToColumnAsync({ boardId, columnId, cardTitle, cardContent }) {
        return function thunk(dispatch) {
            return WebAPIUtils.addCardToColumn({ boardId, columnId, cardTitle, cardContent }).then((result) => {
                // Quick implementation: reload all data
                // TODO: Only update the data that changed
                dispatch(AppActions.initializeAsync());
            });
        };
    },

    showCardEntryModal({ boardId, columnId }) {
        return {
            type: ActionTypes.SHOW_CARD_ENTRY_MODAL,
            boardId,
            columnId
        };
    },

    hideModal({ modalId }) {
        return function thunk(dispatch) {
            return new Promise((resolve) => {
                dispatch({
                    type: ActionTypes.HIDE_MODAL,
                    modalId
                });

                // Allow the animation to finish before deleting it completely.
                // TODO: This is pretty goofy, find a better way to do this.
                setTimeout(() => {
                    dispatch({
                        type: ActionTypes.REMOVE_MODAL,
                        modalId
                    });
                    resolve();
                }, 500);
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
