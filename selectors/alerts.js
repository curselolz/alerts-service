import { createSelector } from 'reselect';
import _ from 'lodash'

const getAllAlerts = state => state.alerts.alerts;
const getFetchedAlert = state => state.alerts.alerts.fetchedAlert;

export const getAlerts = createSelector(
  getAllAlerts,
  getFetchedAlert,
  (alerts, fetchedAlert) => alerts.map(alert => fetchedAlert && alert.uid === fetchedAlert.uid ? fetchedAlert : alert)
)