import _ from 'lodash';
import { FETCH_OPENRTLS_TAGS_SN } from '../actions/init-application';

const DEFAULT_STATE = {};

export default function openRtlsTagsSn(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_OPENRTLS_TAGS_SN:
            return _.keyBy(action.payload, 'uid');
        default:
            return state;
    }
}
