import { createSelector } from 'reselect';

const getSerialNumbers = state => {
    let powerMotes = Object.values(state.serialNumbers);
    let openRtlsTagsSn = Object.values(state.openRtlsTagsSn);

    let openRtlsTagsSnMod = openRtlsTagsSn.map(function (item, index) {
        item = { ...item, type: 'UWB tags' };
        return item;
    })

    return powerMotes.concat(openRtlsTagsSnMod);
};

export const getAvailableSNs = createSelector(
    [getSerialNumbers], (serialNumbers) => serialNumbers.filter(serialNumber => serialNumber.attachedTo === null)
);

export const getAvailableSNValues = (trackables) => {
    return getSerialNumbers(trackables);
}
