export const GET_ALL_ALERTS = 'CVO/ALERTS/GET_ALL_ALERTS';
export const GET_ALL_ALERTS_SUCCESS = 'CVO/ALERTS/GET_ALL_ALERTS_SUCCESS';
export const GET_ALL_ALERTS_ERROR = 'CVO/ALERTS/GET_ALL_ALERTS_ERROR';

export const FETCH_ALERT = 'CVO/ALERTS/FETCH_ALERT';
export const FETCH_ALERT_SUCCESS = 'CVO/ALERTS/FETCH_ALERT_SUCCESS';
export const FETCH_ALERT_ERROR = 'CVO/ALERTS/FETCH_ALERT_ERROR';

export const PATCH_ALERT = 'CVO/ALERTS/PATCH_ALERT';
export const PATCH_ALERT_SUCCESS = 'CVO/ALERTS/PATCH_ALERT_SUCCESS';
export const PATCH_ALERT_ERROR = 'CVO/ALERTS/PATCH_ALERT_ERROR';

export const API_ALERT = '/api/alerts/';

export const API_ESCALATION_RULE = 'api/alert-escalation-rules/';

export const FETCH_ALL_ESCALATION_RULES = 'CVO/ALERTS/FETCH_ALL_ESCALATION_RULES';
export const FETCH_ALL_ESCALATION_RULES_SUCCESS = 'CVO/ALERTS/FETCH_ALL_ESCALATION_RULES_SUCCESS';
export const FETCH_ALL_ESCALATION_RULES_ERROR = 'CVO/ALERTS/FETCH_ALL_ESCALATION_RULES_ERROR';

export const PATCH_ESCALATION_RULE = 'CVO/ALERTS/PATCH_ESCALATION_RULE';
export const PATCH_ESCALATION_RULE_SUCCESS = 'CVO/ALERTS/PATCH_ESCALATION_RULE_SUCCESS';
export const PATCH_ESCALATION_RULE_ERROR = 'CVO/ALERTS/PATCH_ESCALATION_RULE_ERROR';

export const AUDIO_LINK = 'https://s3.eu-central-1.amazonaws.com/ltg-test/1097.wav';

export const CHANGE_MODAL_STATE = 'CVO/ALERTS/CHANGE_MODAL_STATE';
export const APP_ROUTE = '/trackables';
export const PERSONS_ROUTE = '/api/trackables/persons/';
export const ASSETS_ROUTE = '/api/trackables/assets/';
export const UPLOAD_IMAGE_ROUTE = '/api/files/trackables';
export const SERIAL_NUMBERS_ROUTE = 'api/devices/serialnumbers/powermotes/';
export const OPENRTLS_TAGS_SERIAL_NUMBERS_ROUTE = 'api/devices/serialnumbers/uwb-tags'
export const ZONES_ROUTE = 'api/locations/zones/';
export const PASSAGES_ROUTE = 'api/locations/passages/';
export const TRACKABLE_GROUPS_ROUTE = 'api/groups/trackables/';
export const LOCATIONS_GROUPS_ROUTE = 'api/groups/locations/';

export const ASSET_TYPE = 'asset';
export const PERSON_TYPE = 'person';

export const DEFAULT_STATUSES = { Total: 0, Inactive: 0, Active: 0, Planned: 0 };
export const DEFAULT_STATUSES_FILTER_STATE = { Inactive: true, Active: true, Planned: true };

export const formFieldsByType = {
    asset: ['name', 'picture', 'supervisor', 'department', 'trackableDeviceSerialNumber', 'note'],
    person: ['name', 'lastName', 'picture', 'supervisor', 'department', 'trackableDeviceSerialNumber', 'email', 'phone', 'note']
};

export const TRACKABLE_STATUSES = {
    PLANNED: 'Planned',
    ACTIVE: 'Active',
    INACTIVE: 'Inactive'
};
