import uuid from 'node-uuid';
import ActionTypes from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

function immutablePush(array, item) {
    const copy = array.slice(0);
    copy.push(item);
    return copy;
}

function immutableAssign(array, id, obj) {
    const copy = array.slice(0);
    for (let ii = 0; ii < copy.length; ii++) {
        if (copy[ii].id === id) {
            copy[ii] = Object.assign({}, copy[ii], obj);
        }
    }

    return copy;
}

function immutableRemove(array, id) {
    return array.filter(x => x.id !== id);
}

export default function modalReducer(state = InitialState.modal, action) {
    switch (action.type) {
        case ActionTypes.SHOW_CONFIRM_MODAL:
            {
                const modal = {
                    componentName: 'ConfirmModal',
                    id: uuid.v4(),
                    open: true,
                    props: {
                        title: action.title,
                        content: action.content,
                        confirmLabel: action.confirmLabel,
                        cancelLabel: action.cancelLabel,
                        confirmAction: action.confirmAction,
                        cancelAction: action.cancelAction
                    }
                };

                const newStack = immutablePush(state.stack, modal);
                return { stack: newStack };
            }

        case ActionTypes.SHOW_CARD_ENTRY_MODAL:
            {
                const modal = {
                    componentName: 'CardEntryModal',
                    id: uuid.v4(),
                    open: true,
                    props: {
                        boardId: action.boardId,
                        columnId: action.columnId
                    }
                };

                const newStack = immutablePush(state.stack, modal);
                return { stack: newStack };
            }
        case ActionTypes.SHOW_BOARD_ENTRY_MODAL:
            {
                const modal = {
                    componentName: 'BoardEntryModal',
                    id: uuid.v4(),
                    open: true,
                    props: {}
                };

                const newStack = immutablePush(state.stack, modal);
                return { stack: newStack };
            }
        case ActionTypes.SHOW_COLUMN_ENTRY_MODAL:
            {
                const modal = {
                    componentName: 'ColumnEntryModal',
                    id: uuid.v4(),
                    open: true,
                    props: {
                        boardId: action.boardId
                    }
                };

                const newStack = immutablePush(state.stack, modal);
                return { stack: newStack };
            }
        case ActionTypes.HIDE_MODAL:
            {
                const id = action.modalId;

                const newStack = immutableAssign(state.stack, id, { open: false });
                return { stack: newStack };
            }
        case ActionTypes.REMOVE_MODAL:
            {
                const id = action.modalId;

                const newStack = immutableRemove(state.stack, id);
                return { stack: newStack };
            }
        default:
            return state;
    }
}
