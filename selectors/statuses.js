import { createSelector } from 'reselect';
import { DEFAULT_STATUSES } from '../constants';

const getAssets = state => Object.values(state.assets.data);
const getPersons = state => Object.values(state.persons.data);

export const getStatuses = createSelector(
    [getAssets, getPersons],
    (assets, persons) => {
        return {
            Assets: { ...assets.reduce((acc, val) => Object.assign(acc, { Total: assets.length, [val.status]: ++acc[val.status] }), { ...DEFAULT_STATUSES }) },
            Persons: { ...persons.reduce((acc, val) => Object.assign(acc, { Total: persons.length, [val.status]: ++acc[val.status] }), { ...DEFAULT_STATUSES }) }
        };
    }
);
