import { createSelector } from 'reselect';
import _ from 'lodash'

const getAllRules = state => state.escalation.allRules;

export const getRuleNew = createSelector(
  [getAllRules],
  (allRules) => allRules.find(el => el.alertStatus === 'new')
)

export const getRuleInHand = createSelector(
  [getAllRules],
  (allRules) => allRules.find(el => el.alertStatus === 'inHand')
)