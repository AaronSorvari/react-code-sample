import { normalize, arrayOf } from 'normalizr';
import { browserHistory } from 'react-router';
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
                dispatch(AppActions.initializeAsync()).then(() => {
                    const newBoardId = result.boardId;
                    browserHistory.push(`/${newBoardId}`);
                });
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

    deleteBoardAsync({ boardId }) {
        return function thunk(dispatch) {
            return WebAPIUtils.deleteBoard({ boardId }).then((result) => {
                // Quick implementation: reload all data
                // TODO: Only update the data that changed
                dispatch(AppActions.initializeAsync());
            });
        };
    },

    deleteColumnAsync({ boardId, columnId }) {
        return function thunk(dispatch) {
            return WebAPIUtils.deleteColumn({ boardId, columnId }).then((result) => {
                // Quick implementation: reload all data
                // TODO: Only update the data that changed
                dispatch(AppActions.initializeAsync());
            });
        };
    },

    deleteCardAsync({ boardId, columnId, cardId }) {
        return function thunk(dispatch) {
            return WebAPIUtils.deleteCard({ boardId, columnId, cardId }).then((result) => {
                // Quick implementation: reload all data
                // TODO: Only update the data that changed
                dispatch(AppActions.initializeAsync());
            });
        };
    },

    showConfirmModal({ title, content, confirmLabel, cancelLabel, confirmAction, cancelAction }) {
        return {
            type: ActionTypes.SHOW_CONFIRM_MODAL,
            title,
            content,
            confirmLabel,
            cancelLabel,
            confirmAction,
            cancelAction
        };
    },

    showBoardEntryModal() {
        return {
            type: ActionTypes.SHOW_BOARD_ENTRY_MODAL
        };
    },

    showColumnEntryModal({ boardId }) {
        return {
            type: ActionTypes.SHOW_COLUMN_ENTRY_MODAL,
            boardId
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
    }
};

export default AppActions;
