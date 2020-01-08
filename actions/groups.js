/**
 * @author Yevhenii Nesterov <yevhenii.nesterov@leantegra.com>
 */

import { cvoFetch, jsonOrDie, getRequestOpts } from 'cvo-tools';
import { fetchGroups } from './init-application';
import { ASSETS_ROUTE, PERSONS_ROUTE } from '../constants';
import * as assetsActions from './assets';
import * as personsActions from './persons';

const ASSET_GROUPS_ROUTE = (uid) => `${ASSETS_ROUTE}${uid}/groups/`;
const PERSON_GROUPS_ROUTE = (uid) => `${PERSONS_ROUTE}${uid}/groups/`;

const TRACKABLE_ROUTES = {
    asset: ASSET_GROUPS_ROUTE,
    person: PERSON_GROUPS_ROUTE
};

const TRACKABLE_EVENTS = {
    asset: { ...assetsActions },
    person: { ...personsActions }
};

export function patchTrackableGroups(type, trackableUid, groups) {
    return dispatch => {
        dispatch({ type: TRACKABLE_EVENTS[type][`PATCH_${type.toUpperCase()}_GROUPS`] });
        cvoFetch(TRACKABLE_ROUTES[type](trackableUid), getRequestOpts('PUT', { value: groups }))
            .then(jsonOrDie)
            .then(data => {
                dispatch(patchTrackableGroupsSuccess(type, data));
                fetchGroups().then(dispatch);
            })
            .catch(error => {
                console.error(error);
                dispatch(patchTrackableGroupsError(type, error));
            });
    };
}
export function patchTrackableGroupsSuccess(type, trackable) {
    return {
        type: TRACKABLE_EVENTS[type][`PATCH_${type.toUpperCase()}_GROUPS_SUCCESS`],
        payload: trackable
    };
}
export function patchTrackableGroupsError(type, error) {
    return {
        type: TRACKABLE_EVENTS[type][`PATCH_${type.toUpperCase()}_GROUPS_ERROR`],
        payload: error
    };
}