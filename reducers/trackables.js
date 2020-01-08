import _ from 'lodash';
import {
    FETCH_PERSONS_SUCCESS,
    FETCH_ASSETS_SUCCESS
} from '../actions/trackables';

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case FETCH_ASSETS_SUCCESS:
            return _.keyBy(action.payload, 'uid');
        case FETCH_PERSONS_SUCCESS:
            return _.keyBy(action.payload, 'uid');
        default:
            return state;
    }
}