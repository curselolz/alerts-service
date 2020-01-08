import { createSelector } from 'reselect';

const getAssets = state => state.assets;
const getPersons = state => state.persons;
const getSerialNumbers = state => state.serialNumbers;
const getOpenRtlsTagsSn = state => state.openRtlsTagsSn;
const getZones = state => state.zones;
const getPassages = state => state.passages;
const getGroups = state => state.groups;
const getLocationsGroups = state => state.locationsGroups;

const patchTrackables = (assets, persons, serialNumbers, getOpenRtlsTagsSn, zones, passages, groups, locationsGroups) => {
    return [
        ...Object.values(assets.data).map(patchTrackableByType('asset', serialNumbers, getOpenRtlsTagsSn, zones, passages, groups, locationsGroups)),
        ...Object.values(persons.data).map(patchTrackableByType('person', serialNumbers, getOpenRtlsTagsSn, zones, passages, groups, locationsGroups))
    ];
};

function patchTrackableByType(type, serialNumbers, getOpenRtlsTagsSn, zones, passages, groups, locationsGroups) {
    let locations = { ...zones, ...passages };

    return (trackable) => {
        let trackableGroupNames = [];
        Object.keys(groups).forEach(key => {
            let group = groups[key];
            group.children.forEach(groupTrackableUid => {
                if (groupTrackableUid === trackable.uid) {
                    trackableGroupNames.push(group.name);
                }
            });
        });

        let locationsGroupsNames = [];
        Object.keys(locationsGroups).forEach(key => {
            let locationGroup = locationsGroups[key];
            locationGroup.children.forEach(locationUid => {
                if (locationUid === trackable.location.zone) {
                    locationsGroupsNames.push(locationGroup.name);
                }
            });
        });

        let serialNumbersAll = { ...serialNumbers, ...getOpenRtlsTagsSn };
        let serialNumber = serialNumbersAll[trackable.trackableDeviceSerialNumber];
        let displayName = trackable.lastName ? `${trackable.name} ${trackable.lastName}` : trackable.name;
        let trackableDeviceSerialNumber = serialNumber ? serialNumber.uid : '';
        let assignedTag = serialNumber ? serialNumber.value : '';
        let location = trackable.lastSeen && locations[trackable.location.zone || trackable.location.passage];
        let { floor, coordinates } = trackable.location;

        return {
            ...trackable,
            floor,
            coordinates,
            type,
            displayName,
            trackableDeviceSerialNumber,
            assignedTag,
            location: location && location.name || '',
            groups: trackableGroupNames,
            locationsGroups: locationsGroupsNames
        };
    };
}

export const getTrackablesLoading = createSelector(
    [getAssets, getPersons],
    (assets, persons) => assets.loading && persons.loading
);

export const getTrackablesList = createSelector(
    [getAssets, getPersons, getSerialNumbers, getOpenRtlsTagsSn, getZones, getPassages, getGroups, getLocationsGroups],
    patchTrackables
);
