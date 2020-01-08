import _ from 'lodash';
import {
    FETCH_PERSONS,
    FETCH_PERSONS_SUCCESS,
    FETCH_PERSONS_ERROR,

    FETCH_PERSON,
    FETCH_PERSON_SUCCESS,

    ADD_PERSON,
    ADD_PERSON_SUCCESS,

    PATCH_PERSON,
    PATCH_PERSON_SUCCESS,

    DELETE_PERSON,
    DELETE_PERSON_SUCCESS
} from '../actions/persons';

const DEFAULT_STATE = {
    data: {},
    loading: false,
    error: null
};

export default function persons(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_PERSONS:
            return { ...state, loading: true };
        case FETCH_PERSONS_SUCCESS:
            return { ...state, data: _.keyBy(action.payload, 'uid'), loading: false };
        case FETCH_PERSONS_ERROR:
            return { ...state, loading: false, error: action.payload };

        case FETCH_PERSON:
            return { ...state, loading: true };
        case FETCH_PERSON_SUCCESS:
            return { ...state, data: { ...state.data, [action.uid]: action.payload }, loading: false };

        case ADD_PERSON:
        case PATCH_PERSON:
            return { ...state, loading: true };

        case ADD_PERSON_SUCCESS:
            return { ...state, loading: false };

        case PATCH_PERSON_SUCCESS:
            return { ...state, data: { ...state.data, [action.payload.uid]: { ...state.data[action.payload.uid], ...action.payload } }, loading: false };

        case DELETE_PERSON:
            return { ...state, loading: true };
        case DELETE_PERSON_SUCCESS:
            return { ...state, data: _.omit(state.data, action.payload), loading: false };
        default:
            return state;
    }
}
