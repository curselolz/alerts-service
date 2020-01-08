import _ from 'lodash';
import { FETCH_SERIAL_NUMBERS } from '../actions/init-application';

const DEFAULT_STATE = {};

export default function serialNumbers(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_SERIAL_NUMBERS:
            return _.keyBy(action.payload, 'uid');
        default:
            return state;
    }
}
