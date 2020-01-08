import { createFetchToAction } from 'cvo-tools';
import { fetchTrackables } from './trackables';
import { SERIAL_NUMBERS_ROUTE, OPENRTLS_TAGS_SERIAL_NUMBERS_ROUTE, ZONES_ROUTE, PASSAGES_ROUTE, TRACKABLE_GROUPS_ROUTE, LOCATIONS_GROUPS_ROUTE } from '../constants';

export const FETCH_SERIAL_NUMBERS = 'CVO/TRACKABLES/FETCH_SERIAL_NUMBERS';
export const FETCH_ZONES = 'CVO/TRACKABLES/FETCH_ZONES';
export const FETCH_PASSAGES = 'CVO/TRACKABLES/FETCH_PASSAGES';
export const FETCH_TRACKABLE_GROUPS = 'CVO/TRACKABLES/FETCH_TRACKABLE_GROUPS';
export const FETCH_LOCATIONS_GROUPS = 'CVO/TRACKABLES/FETCH_LOCATIONS_GROUPS';
export const FETCH_OPENRTLS_TAGS_SN = 'CVO/TRACKABLES/FETCH_OPENRTLS_TAGS_SN';

export const fetchSerialNumbers = createFetchToAction(SERIAL_NUMBERS_ROUTE, FETCH_SERIAL_NUMBERS);
export const fetchOpenRtlsTags = createFetchToAction(OPENRTLS_TAGS_SERIAL_NUMBERS_ROUTE, FETCH_OPENRTLS_TAGS_SN);
export const fetchZones = createFetchToAction(ZONES_ROUTE, FETCH_ZONES);
export const fetchPassages = createFetchToAction(PASSAGES_ROUTE, FETCH_PASSAGES);
export const fetchGroups = createFetchToAction(TRACKABLE_GROUPS_ROUTE, FETCH_TRACKABLE_GROUPS);
export const fetchLocationsGroups = createFetchToAction(LOCATIONS_GROUPS_ROUTE, FETCH_LOCATIONS_GROUPS);

export function initTrackables() {
    return (dispatch, getState) => {
        let actionsPromises = [
            fetchSerialNumbers(),
            fetchOpenRtlsTags(),
            fetchZones(),
            fetchPassages(),
            fetchGroups(),
            fetchLocationsGroups()
        ];

        Promise.all(actionsPromises)
            .then(actions => actions.map(dispatch))
            .then(() => dispatch(fetchTrackables('asset')))
            .then(() => dispatch(fetchTrackables('person')))
            .catch(err => console.error(err));
    };
}
