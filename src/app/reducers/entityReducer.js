import ActionTypes from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

export default function entityReducer(state = InitialState.entities, action) {
    switch (action.type) {
        case ActionTypes.INITIALIZE:
            // For now, directly use the normalized JSON entity data
            return action.entities;
        default:
            return state;
    }
}
