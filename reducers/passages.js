import _ from 'lodash';
import { FETCH_PASSAGES } from '../actions/init-application';

const DEFAULT_STATE = {};

export default function passages(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_PASSAGES:
            return _.keyBy(action.payload, 'uid');
        default:
            return state;
    }
}
