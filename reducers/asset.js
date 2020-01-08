import _ from 'lodash';
import {
    FETCH_ASSETS,
    FETCH_ASSETS_SUCCESS,
    FETCH_ASSETS_ERROR,

    ADD_ASSET,
    ADD_ASSET_SUCCESS,

    FETCH_ASSET,
    FETCH_ASSET_SUCCESS,

    PATCH_ASSET,
    PATCH_ASSET_SUCCESS,

    DELETE_ASSET,
    DELETE_ASSET_SUCCESS
} from '../actions/assets';

const DEFAULT_STATE = {
    data: {},
    loading: false,
    error: null
};

export default function assets(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_ASSETS:
            return { ...state, loading: true };
        case FETCH_ASSETS_SUCCESS:
            return { ...state, data: _.keyBy(action.payload, 'uid'), loading: false };
        case FETCH_ASSETS_ERROR:
            return { ...state, loading: false, error: action.payload };

        case FETCH_ASSET:
            return { ...state, loading: true };
        case FETCH_ASSET_SUCCESS:
            return { ...state, data: { ...state.data, [action.uid]: action.payload }, loading: false };

        case ADD_ASSET:
        case PATCH_ASSET:
            return { ...state, loading: true };

        case ADD_ASSET_SUCCESS:
            return { ...state, loading: false };

        case PATCH_ASSET_SUCCESS:
            return { ...state, data: { ...state.data, [action.payload.uid]: { ...state.data[action.payload.uid], ...action.payload } }, loading: false };

        case DELETE_ASSET:
            return { ...state, loading: true };
        case DELETE_ASSET_SUCCESS:
            return { ...state, data: _.omit(state.data, action.payload), loading: false };
        default:
            return state;
    }
}
