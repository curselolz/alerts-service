import { combineReducers } from 'redux';

import serialNumbers from './serial-numbers';
import zones from './zones';
import passages from './passages';
import assets from './asset';
import persons from './persons';
import filters from './filters';
import groups from './groups';
import locationsGroups from './locationsGroups';
import openRtlsTagsSn from './openrtls-tags-sn';
import alerts from './alerts';
import escalation from './escalation';


export default combineReducers({
  serialNumbers,
  zones,
  passages,
  assets,
  persons,
  filters,
  groups,
  locationsGroups,
  openRtlsTagsSn,
  alerts,
  escalation,
});
