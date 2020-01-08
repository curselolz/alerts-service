import { mapValues } from 'lodash';
import {
    INIT_FILTERS,
    TOGGLE_FILTER,
    TOGGLE_FILTER_GROUP
} from '../actions/filters';

const DEFAULT_STATE = {
    Assets: {
        Inactive: true,
        Active: true,
        Planned: true
    },
    Persons: {
        Inactive: true,
        Active: true,
        Planned: true
    }
};

export default function filters(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case INIT_FILTERS:
            return action.filters || state;
        case TOGGLE_FILTER: {
            let [groupName, type] = action.filterPath;
            let { [groupName]: group } = state;
            let { [type]: value } = group;

            return {
                ...state,
                [groupName]: {
                    ...group,
                    [type]: !value
                }
            };
        }

        case TOGGLE_FILTER_GROUP: {
            let [groupName] = action.filterPath;
            let status = Object.keys(state[groupName]).every(key => {
                return state[groupName][key] === true;
            });
            return {
                ...state,
                [groupName]: mapValues(state[groupName], () => !status)
            };
        }

        default:
            return state;
    }
}
