import mapValues from 'lodash/mapValues';
import filter from 'lodash/filter';
import { createSelector } from 'reselect';

const getFloors = state => state.floors.floors;
const getZones = state => state.trackables.zones;
const getPassages = state => state.trackables.passages;

export const getFloorInfoIndex = createSelector(
    [getFloors, getZones, getPassages],
    composeFloorInfo
);

function composeFloorInfo(floors, zones, passages) {
    zones = Object.values(zones);
    passages = Object.values(passages);

    return mapValues(floors, floor => {
        let { uid: parent } = floor;
        return {
            ...floor,
            zones: filter(zones, { parent }),
            passages: filter(passages, { parent })
        };
    });
}
