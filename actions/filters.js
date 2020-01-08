import { cvoStorage } from 'cvo-tools';
export const INIT_FILTERS = 'CVO/TRACKABLES/INIT_FILTERS';
export const TOGGLE_FILTER_GROUP = 'CVO/TRACKABLES/TOGGLE_FILTER_GROUP';
export const TOGGLE_FILTER = 'CVO/TRACKABLES/TOGGLE_FILTER';
const TRACKABLES_FILTER = 'trackablesTableVievFilter';

export function initFilters() {
    return (dispatch) => {
        let savedFilters = cvoStorage.userGet(TRACKABLES_FILTER);
        dispatch({ type: INIT_FILTERS, filters: savedFilters });
    };
}

export function toggleFilter(filterPath) {
    return (dispatch, getState) => {
        dispatch({ type: TOGGLE_FILTER, filterPath });
        cvoStorage.userSet(TRACKABLES_FILTER, getState().trackables.filters);
    };
}

export function toggleFilterGroup(filterPath) {
    return (dispatch, getState) => {
        dispatch({ type: TOGGLE_FILTER_GROUP, filterPath });
        cvoStorage.userSet(TRACKABLES_FILTER, getState().trackables.filters);
    };
}
