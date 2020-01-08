import { cvoFetch, jsonOrDie, getRequestOpts } from 'cvo-tools';
import * as assetsActions from './assets';
import * as personsActions from './persons';
import { fetchSerialNumbers, fetchOpenRtlsTags } from './init-application';
import { ASSETS_ROUTE, PERSONS_ROUTE } from '../constants';

const TRACKABLE_EVENTS = {
    asset: { ...assetsActions },
    person: { ...personsActions }
};

const TRACKABLE_ROUTES = {
    asset: ASSETS_ROUTE,
    person: PERSONS_ROUTE
};

const TRACKABLE_OBSERVATION_INTERVAL = 1000;

// FETCH trackables
export function fetchTrackables(type) {
    return dispatch => {
        dispatch({ type: TRACKABLE_EVENTS[type][`FETCH_${type.toUpperCase()}S`] });
        cvoFetch(TRACKABLE_ROUTES[type], {})
            .then(jsonOrDie)
            .then(data => dispatch(fetchTrackablesSuccess(type, data)))
            .catch(error => {
                console.error(error);
                dispatch(fetchTrackablesError(type, error.message || error));
            });
    };
}
export function fetchTrackablesSuccess(type, trackables) {
    return {
        type: TRACKABLE_EVENTS[type][`FETCH_${type.toUpperCase()}S_SUCCESS`],
        payload: trackables
    };
}
export function fetchTrackablesError(type, error) {
    return {
        type: TRACKABLE_EVENTS[type][`FETCH_${type.toUpperCase()}S_ERROR`],
        payload: error
    };
}

// FETCH trackable
export function fetchTrackable(type, uid) {
    return dispatch => {
        dispatch({ type: TRACKABLE_EVENTS[type][`FETCH_${type.toUpperCase()}`] });
        cvoFetch(TRACKABLE_ROUTES[type] + uid, {})
            .then(jsonOrDie)
            .then(data => {
                dispatch(fetchTrackableSuccess(type, data));
                //fetchSerialNumber(data.powerMoteSerialNumber)(dispatch);
                //fetchLocation(data.location)(dispatch);
            })
            .catch(error => {
                console.error(error);
                dispatch(fetchTrackableError(error.message || error));
            });
    };
}
export function fetchTrackableSuccess(type, trackable) {
    return {
        type: TRACKABLE_EVENTS[type][`FETCH_${type.toUpperCase()}_SUCCESS`],
        uid: trackable.uid,
        payload: trackable
    };
}
export function fetchTrackableError(type, error) {
    return {
        type: TRACKABLE_EVENTS[type][`FETCH_${type.toUpperCase()}_ERROR`],
        payload: error
    };
}

// ADD trackable
export function addTrackable(type, trackable) {
    return dispatch => {
        dispatch({ type: TRACKABLE_EVENTS[type][`ADD_${type.toUpperCase()}`] });
        cvoFetch(TRACKABLE_ROUTES[type], getRequestOpts('POST', trackable))
            .then(jsonOrDie)
            .then(data => {
                dispatch(fetchTrackables('asset'));
                dispatch(fetchTrackables('person'));
                dispatch(addTrackableSuccess(type, data));
                fetchOpenRtlsTags().then(dispatch);
                fetchSerialNumbers().then(dispatch);
            })
            .catch(error => {
                console.error(error);
                dispatch(addTrackableError(type, error));
            });
    };
}
export function addTrackableSuccess(type, trackable) {
    return {
        type: TRACKABLE_EVENTS[type][`ADD_${type.toUpperCase()}_SUCCESS`],
        payload: trackable
    };
}
export function addTrackableError(type, error) {
    return {
        type: TRACKABLE_EVENTS[type][`ADD_${type.toUpperCase()}_ERROR`],
        payload: error
    };
}

// PATCH trackable
export function patchTrackable(type, uid, trackable) {
    return dispatch => {
        dispatch({ type: TRACKABLE_EVENTS[type][`PATCH_${type.toUpperCase()}`] });
        cvoFetch(TRACKABLE_ROUTES[type] + uid, getRequestOpts('PATCH', trackable))
            .then(jsonOrDie)
            .then(data => {
                dispatch(patchTrackableSuccess(type, data));
                fetchTrackable(type, uid)(dispatch);
                fetchOpenRtlsTags().then(dispatch);
                fetchSerialNumbers().then(dispatch);
            })
            .catch(error => {
                console.error(error);
                dispatch(patchTrackableError(type, error));
            });
    };
}
export function patchTrackableSuccess(type, trackable) {
    return {
        type: TRACKABLE_EVENTS[type][`PATCH_${type.toUpperCase()}_SUCCESS`],
        payload: trackable
    };
}
export function patchTrackableError(type, error) {
    return {
        type: TRACKABLE_EVENTS[type][`PATCH_${type.toUpperCase()}_ERROR`],
        payload: error
    };
}

// DELETE trackable
export function deleteTrackable(type, uid) {
    return dispatch => {
        dispatch({ type: TRACKABLE_EVENTS[type][`DELETE_${type.toUpperCase()}`] });
        cvoFetch(TRACKABLE_ROUTES[type] + uid, getRequestOpts('DELETE'))
            .then(data => {
                dispatch(deleteTrackableSuccess(type, uid));
                fetchOpenRtlsTags().then(dispatch);
                fetchSerialNumbers().then(dispatch);
            })
            .catch(error => {
                console.error(error);
                dispatch(deleteTrackableError(type, error));
            });
    };
}
export function deleteTrackableSuccess(type, trackable) {
    return {
        type: TRACKABLE_EVENTS[type][`DELETE_${type.toUpperCase()}_SUCCESS`],
        payload: trackable
    };
}
export function deleteTrackableError(type, error) {
    return {
        type: TRACKABLE_EVENTS[type][`DELETE_${type.toUpperCase()}_ERROR`],
        payload: error
    };
}

let observableTimer;
export const observeTrackable = (trackable) => dispatch => {
    if (observableTimer) {
        clearInterval(observableTimer);
    }
    if (trackable) {
        let { uid, type } = trackable;
        fetchTrackable(type, uid)(dispatch);
        observableTimer = setInterval(() => fetchTrackable(type, uid)(dispatch), TRACKABLE_OBSERVATION_INTERVAL);
    }
};

export function initFilters() {
    return dispatch => {
        dispatch({ type: 'INIT_FILTERS', data: { page: 'trackables' } });
    };
}
