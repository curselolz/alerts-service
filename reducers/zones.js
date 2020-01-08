import _ from 'lodash';
import { FETCH_ZONES } from '../actions/init-application';

const DEFAULT_STATE = {};

export default function zones(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_ZONES:
            return _.keyBy(action.payload, 'uid');
        default:
            return state;
    }
}
